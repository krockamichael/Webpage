# Komunikácia LuaServer - Unity

Kvôli predchádzajúcim problémom s kompabilitou medzi platformami bolo rozhodnuté, že ďalší vývoj projektu bude smerovať ku komunikácii medzi procesmi prostredníctvom IPC alebo RPC. Cieľom je tak úplne izolovať časť, ktorá pre svoju činnosť vyžaduje programovacie jazyky Lua a Terra. Táto časť je kontajnerizovaná. Kontajner obsahuje interpreter `LuaJIT` z distribúcie `Luapower`, všetky závislosti a Lua moduly potrebné k jeho činnosti.

Táto komunikácia je v súčasnom stave na úrovni v rámci lokálneho stroja, ale v budúcnosti je možné upraviť projekt tak, aby využíval vzdialený server. Z hľadiska povahy tejto komunikácie je potrebné zabezpečiť vysokú priepustnosť.

Kontajner je založený na [Lua CI Image](../infrastruktura/ci/gitlab_images/lua.md), ktorý je použitý taktiež vo vývojovom prostredí [Devenv](../infrastruktura/podporne_nastroje/devenv.md). V kontajneri po spustení main-u beží nekonečný cyklus počúvajúci na správy zo strany Unity klienta. Komunikácia je v súčasnej implementácií jednosmerná, LuaServer vie iba odpovedať na požiadavky Unity klienta. V tomto zmysle aj ak na pozadí beží [Layouter](moduly_systemu/luaserver.md), ktorý prepočítava súradnice, zmena bude prešírená do Unity iba po zavolaní príslúšných metód na aktualizáciu pozícií a veľkostí uzlov.

## Posielanie správ v skratke

Posielanie správ je zabezpečené MessagePackom a knižnicou ZeroMQ. Správy sú posielané vo formáte 


```bash
[1] názov funkcie ktorá sa má vykonať
[2] parametre funkcie v JSON formáte (aktuálne iba ako pole stringov, JSON v budúcnosti)
[3] výstup funkcie v JSON formáte
```

Unity klient pošle správu s názvom funkcie a parametrami, pričom časť pre výstup nechá prázdny. LuaServer správu spracuje a vykoná funkciu s príslušnými parametrami a do časti pre výstup vloží serializovaný výstup funkcie. Takúto správu odošle klientovi na Unity strane, ktorý si ďalej výstup deserializuje a pracuje s ním ako s objektom.

### Klient Unity

Unity strana má vytvorený skript v triede NetHandler.cs, ktorý je zodpovedný za odosielanie a prijímanie takýchto správ pomocou metódy `send()`. Deserializácia odpovede sa zaobstaráva na mieste kde bola metóda `send()` volaná, teda nie priamo vo metóde `send()`. Skript pre NetHandler je v tomto momente uložený v priečinku `3dsoftvis_remake\Projects\3DSoftviz\UnityProject\Assets\Scripts` v solution `Softviz`.

## Komunikácia - podrobný opis

Komunikáciu medzi kontajnerom (LuaServer) a hostiteľským systémom (Unity) je založená na vzdialenom volaní procedúr (RPC). Zároveň je potrebné brať do úvahy kompatibilitu medzi platformami. Nakoľko kontajner (LuaServer) využíva operačný systém Linux Ubuntu, nie je možné zabezpečiť kompatibilitu so všetkými paradigmami. 

Z hľadiska rýchlosti sú jednotlivé paradigmy zoradené zostupne od najrýchlejšej po najpomalšiu :

* Zdieľaná pamäť (shared memory/shm)
* Message Queue
* Unix domain sockets
* Pipe
* FIFO (named pipe)
* TCP socket

Dôležité je poznamenať, že rozdiel medzi FIFO a TCP socketmi predstavuje približne 16%. 

Ako bolo vyššie uvedené, kvôli kompatibilite nie je možné použiť všetky paradigmy. Z hľadiska kompatibility je najvýhodnejšie použitie TCP socketu. Prostredníctvom TCP socketu je následne možné prejsť na použitie vzdialeného servera bez potreby modifikácie klientskej časti. 

Na zabezpečenie komunikácie existuje viacero knižníc, ktoré sa líšia rýchlosťou, podporovanými vzormi komunikácie, prípadne použitím brokerov (centrálnych uzlov). Pre potreby projektu je nevyhnutné, aby bola dostupná knižnica pre programovacie jazyky Lua a C#.

### ZeroMQ

[ZeroMQ](https://zeromq.org/) (tiež známe ako ØMQ, 0MQ, alebo zmq) predstavuje rámec, ktorý
umožňuje prenášať správy medzi viacerými uzlami. Podporuje viaceré spôsoby prenosu - v rámci
procesu, medzi procesmi, TCP a multicast. 

ZeroMQ ďalej implementuje mechanizmus `High Water Mark`, ktorý predstavuje pevný limit maximálneho
počtu správ v rade, po naplnení ktorého dôjde k blokovaniu alebo zahadzovaniu ďalších prijatých správ. 

Výhodou riešenia je kvalitná [dokumentácia](https://zeromq.org/get-started/). K dispozícii je ako verzia
pre jazyk [C#](https://github.com/zeromq/netmq), tak aj pre jazyk Lua. [Lua-zmq](https://github.com/Neopallium/lua-zmq)
predstavuje binding nad ZeroMQ verzie 2. Knižnica [Lzmq](https://github.com/zeromq/lzmq) je binding
nad verziami 3 a 4. +
Obe knižnice je možné inštalovať prostredníctvom správcu `Luarocks`. 

V spojení s interpreterom `LuaJIT` by mal rámec poskytovať dostatočnú rýchlosť aj pri komunikácii
prostredníctvom TCP socketu. Podľa dostupných informácii je možné dosiahnuť rýchlosť
až 1 478.619 Mb/s. 

![benchmark ZeroMQ](img/benchmark-zmq.png)

V repozitároch [Lzmq-guide](https://github.com/moteus/lzmq-zguide) a [Zguide](https://github.com/booksbyus/zguide) je možné nájsť viacero ukážkových implementácií pre rôzne programovacie jazyky. 

Nižšie je možné vidieť ukážkové riešenie jednoduchej klient-server komunikácie prostredníctvom Unix domain socketov.
Server bol vytvorený v jazyku C a klient v jazyku Lua.

```c
//  C Hello World server

#include <zmq.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <assert.h>

int main (void)
{
    //  Socket to talk to clients
    void *context = zmq_ctx_new ();
    void *responder = zmq_socket (context, ZMQ_REP);
    int rc = zmq_bind(responder, "ipc:///src/test");
    assert(rc == 0);

    while (1) {
        char buffer [10];
        zmq_recv (responder, buffer, 10, 0);
        printf ("Received Hello\n");
        sleep (1);          //  Do some 'work'
        zmq_send (responder, "World", 5, 0);
    }
    return 0;
}
```

```lua
--
--  Lua Hello World client
--  Sends "Hello" to server, expects "World" back
--
--  Author: Robert G. Jakabosky <bobby@sharedrealm.com>
--
local zmq = require "lzmq"

local context = zmq.init(1)

--  Socket to talk to server
print("Connecting to hello world server…")
local socket = context:socket(zmq.REQ)
socket:connect("ipc:///src/test")

for n=1,10 do
    print("Sending Hello " .. n .. " …")
    socket:send("Hello")

    local reply = socket:recv()
    print("Received World " ..  n .. " [" .. reply .. "]")
end
socket:close()
context:term()
```

ZeroMQ poskytuje tiež viacero vzorov komunikácie : 

#### Request-Reply

Prepojenie množiny klientov s množinou služieb. V tomto prípade sa jedná o RPC a model distribúcie úloh. 

#### Publish-Subscribe

Vzor prepája množinu producentov s množinou konzumentov. Ide o model distribúcie údajov. 

#### Pipeline

Potrubie, ktoré spája viacero uzlov. Môže mať viacero krokov a slučiek. Jedná sa o model paralelnej
distribúcie a zberu. 

#### Exclusive pair

Vzor prepája práve 2 sockety. Ide o model prepojenia dvoch vláken v procese.

V našom riešení je využitý vzor Request-Reply s limitáciou na jedného klienta.

## Serializácia

Pred samotným odoslaním je potrebná serializácia údajov. Čím efektívnejšia bude serializácia, tým efektívnejšie môže prebiehať celá komunikácia, obzvlášť pokiaľ by výsledné riešenie komunikovalo so vzdialeným serverom. Medzi najbežnejšie formáty údajov patrí JSON a XML. Existuje viacero knižníc pre jazyky C# aj Lua. 

### JSON

[JSON](https://www.json.org/json-en.html) predstavuje jednoduchý formát na výmenu údajov. Patrí medzi pomerne
ľahko čitateľné a zapisovateľné notácie. Má taktiež širokú podporu. Je založený na 2 základných štruktúrach, a to
kolekcia párov kľúč-hodnota (objekt, záznam, štruktúra, slovník a pod.) a usporiadaný zoznam hodnôt (pole, vektor,
zoznam a pod.). +
Pre programovací jazyk Lua je možné použiť knižnicu priamo z distribúcie Luapower, konkrétne
[CJSON](https://github.com/luapower/cjson). 

V rámci nášho riešenia je vytvorený modul `serializer`, pričom jedným z jeho atribútov je práve modul CJSON. `Serializer` je implementovaný ako objekt, je to z toho dôvodu keby sme vyžadovali serializáciu komplikovanejších objektov, prípadne serializáciu ľubovoľných štruktúr, ktoré by sme si museli najskôr vyskladať. Takisto nám umožňuje vytvárať vlastný zápis json správ, v tom zmysle že nie sme viazaný na štruktúru Lua tabuliek - príkladom je metóda `serializeAttribute`.

### MessagePack

[MessagePack](https://msgpack.org/) je rámec na serializáciu údajov. Podobne ako JSON, umožňuje výmenu údajov medzi viacerými uzlami a programovacími jazykmi. Oproti formátu JSON by mal byť MessagePack efektívnejší a rýchlejší, nakoľko serializované údaje majú menšiu veľkosť. Menšia veľkosť so sebou prináša aj niekoľko obmedzení, ktoré sa týkajú možnej veľkosti údajových typov. Jednotlivé obmedzenia, rovnako ako aj podporované údajové typy je možné nájsť v [špecifikácii](https://github.com/msgpack/msgpack/blob/master/spec.md).

Pre programovací jazyk Lua je k dispozícii knižnica [lua-MessagePack](https://github.com/markstinson/lua-MessagePack), ktorá by mala byť podľa autora rýchla v kombinácii s interpreterom `LuaJIT`. Rovnako aj túto knižnicu je možné inštalovať prostredníctvom `Luarocks`. Pre C# je potom k dispozícii knižnica [msgpack-cli](https://github.com/msgpack/msgpack-cli).

Funkcie tejto knižnice využívame v nekonečnej slučke, pomocou ktorej počúvame na requesty od Unity klienta.

## Ukážka RPC

Väčšina funkcií už je implementovaná pomocou RPC, najjednoduchšie sú getNodeColumn funkcie. Serverová časť počúva na porte TCP/49155. Prijatá správa je následne rozbalená prostredníctvom knižnice MessagePack. Rozbalená správa má potom formu tabuľky, ku ktorej obsahu je možné pristupovať prostredníctvom číselných indexov. V ukážke sa očakáva správa v nasledujúcom tvare.

```lua
local message = {}
message[1] = "command"
message[2] = "params"
message[3] = "result"
```

Všetky atribúty tabuľky sú reprezentované vo forme reťazcov. Jednotlivé lokálne funkcie sú uložené v tabuľke s názvom `_L`, čím je možné zabezpečiť volanie funkcie na základe jej názvu vo forme reťazca. Rovnakým spôsobom je možné uchovávať tiež lokálne premenné.

```lua
local _L = {}
_L["getNodeNameColumn"] = getNodeNameColumn
```

Jednoduchý príklad ako bolo spomínané je napríklad `getNodeNameColumn`, kde je argumentom iba ID grafu. Následne je tento graf dotiahnutý z objektu core a prechádzajú sa všetky uzly grafu pričom sa extrahuje ich názov. Tieto názvy sa postupne pridávajú do tabuľky spolu s ID uzla, aby ich bolo možné mapovať na Unity strane. Po skončení cyklu sa celá tabuľka serializuje. 

```lua
local function getNodeNameColumn(params)
  local graphId = tonumber(params[1])
  local graph = core:getGraph(graphId)
  local nodeNameColumn = {}
  for _, node in pairs(graph.modified_nodes) do
      table.insert(nodeNameColumn, {id = node.id, name = node.data.name})
  end
  return serializer.cjson.encode(nodeNameColumn)
end
```

Funkcia je potom volaná bezpečným spôsobom prostredníctvom funkcie `pcall`. Funkcií sú tiež odovzdané požadované parametre.

```lua
local command = message[1]
local params = message[2]
local status, result = pcall(_L[command], params)
```

Pokiaľ atribút `command` obsahuje reťazec "end", dôjde k nastaveniu premennej cyklu na hodnotu false, server upovedomí klienta a program skončí.


```lua
if command == "end" then
    loop = false
    request[3] = "Server stopping"
    socket:send(mp.pack(request))
    break
end
```

Do atribútu `result` sa vkladá výsledok. Tento atribút je reprezentovaný na klientskej strane vnoreným objektom a na strane servera má atribút formu vnorenej tabuľky. Odpoveď je následne odoslaná klientovi.

```lua
message[3] = json.encode(result)
socket:send(mp.pack(message))
```

Klientska časť je implementovaná v programovacom jazyku C#. Na úspešnú komunikáciu medzi klientskou a serverovou časťou s využitím serializácie prostredníctvom knižnice MessagePack, je potrebné vytvoriť objektové štruktúry, ako na klientskej, tak aj serverovej strane. V zdrojovom kóde je reprezentovaný na Unity strane triedou `NetHandler.cs` a na LuaServer strane modulom `sever.lua`. Dodržanie štruktúry sa týka hlavne použitých údajových typov. Štruktúra objektu, ktorý je mapovaný na tabuľku uvedenú vyššie je možné vidieť na nasledujúcej ukážke.

```c#
public class RemoteCall
{
    public string functionName { get; set; }
    public string[] functionParams { get; set; }
    public string result { get; set; }
}
```

Atribút `functionName` zodpovedá atribútu označenému ako `command`, `functionParams` zodpovedá `params` a `result` je mapovaný na `result`. Takýmto spôsobom je možné zabezpečiť bezproblémové mapovanie C# objektov na tabuľku v jazyku Lua. Rovnako je bezproblémové spätné mapovanie tabuľky na C# objekt, ku ktorého atribútom je možné pristupovať štandardnou bodkovou notáciou.

```c#
MessagePackSerializer serializer = MessagePackSerializer.Get(rpc.GetType());
MemoryStream toUnpack = null;

byte[] responseFromServer = client.ReceiveFrameBytes();
toUnpack = new MemoryStream(responseFromServer);
RemoteCall unpacked = (RemoteCall)serializer.Unpack(toUnpack);
Console.WriteLine(unpacked.result);
```

### Užitočné linky

* https://github.com/luapower
* https://luarocks.org/modules/neopallium/lua-zmq
* https://luarocks.org/modules/moteus/lzmq
* http://zguide.zeromq.org/lua:all
* https://github.com/zeromq/libzmq
* https://github.com/goldsborough/ipc-bench
* https://github.com/grpc
* https://docs.docker.com/engine/reference/run/#ipc-settings---ipc
* https://github.com/msgpack
* https://luarocks.org/modules/fperrad/lua-messagepack