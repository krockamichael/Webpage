# Luaserver
Repozitár Luaserver slúži ako komunikačná vrstva na Lua strane. Jeho primárnou úlohou je zabezpečenie komunikácie medzi [modulmi](http://team03-20.studenti.fiit.stuba.sk/dokumentacia_k_produktu/architektura_systemu/moduly_systemu/lua/) implementovanými v jazyku Lua a C# vrstvou. Združuje moduly implementované v Lua, aby mohli fungovať samostatne od C# a Unity vrstiev, napríklad aj na vzdialenom serveri. Je rozdelený do viacerých skriptov, pričom hlavný z nich, *main.lua*, obsahuje nekonečnú slučku v ktorej čaká na požiadavky. Mapovanie reťazcov na volania konkrétnych funkcií je uložené v tabuľke `_L` a realizujú sa pomocou funkcie [pcall](https://www.lua.org/pil/8.4.html).

##### netHandler
V skripte *nedHandler.lua* je pomocou knižnice [MessagePack](https://msgpack.org/#json-to-msgpack) implementovaná komunikácia cez port. V súčasnom stave je podporovaná komunikácia iba s jedným klientom naraz, ktorý sa môže napojiť na port 49155. V prípade, že prebieha komunikácia, tak nie je možné nadviazať nové spojenie. Pri načítaní modulu sa inicializuje socket, na ktorom bude program počúvať prichádzajúce správy. Funkcia `wait_for_message` je blokujúce volanie, ktoré čaká na správu na zadefinovanom porte a po prijatí je vrátená volajúcemu modulu ako textový reťazec. Funkcia `reply` slúži na odoslanie reťazca, ktorý dostane ako paramater. Pomocou funkcie `terminate` zavolajú knižničné funkcie na ukončenie komunikácie, vrátanie uzavretia socketu.

##### core
Skript *core.lua* vznikol úpravami v originálnom skripte main.lua z predchádzajúceho riešenia, kde bola Lua integrovaná do C# vrstvy pomocou DLL súborov implementovaných v C++. Obsahuje základné funkcie, ktoré sú pomocou implementácie objektu sprístupnené na volanie na základe požiadaviek, ktoré spracúva main.lua. Pri implementácii objektu bol použitý návrhový vzor singleton, pretože je nutné, aby bola jedna inštancia tohto objektu dostupná pre viaceré moduly. Tabuľka `o` obsahuje atribúty objektu a to konkrétne `graphHandler`,`logical_filter`,`slt2_renderer`,`graphManager` a `layoutFactory`, v ktorých sú pomocou `require` vytvorené inštancie modulov potrebných na obsluhu požiadaviek na prácu s grafom, layoutovanie a pod. Atribút `loadedGraphs` obsahuje tabuľku načítaných grafov. Každý graf má pridelené ID a po vytvorení nového grafu sa inkrementuje atribút `counterID`. Inštancia je inicializovaná v module main.lua ako globálna premenná.

##### serializer
Serializer je implementovaný ako objekt a obsahuje atribút cjson, na ktorý je naviazaná rovnomenná knižnica cjson. Jej funkcionalita spočíva v `encode` a `decode` funkciách, ktoré transformujú Lua tabuľky (alebo primitívne typy) na string vo formáte JSON a naopak. Vo väčšine prípadov to postačuje, ale ak chceme vytvárať konkrétnejši obsah správ, je potrebné vytvoriť novú funkciu v skripte serializer.lua. Treba brať ohľad aj na fakt, že uzly a hrany grafu v Lua implementácií obsahujú vzájomné prepojenia, tým pádom vznikajú nekonečné cykly z ktorých sa cjson nedokáže dostať. Ďaľším takýmto prípadom je `hypergraphnode` atribút v `node.data`, ktorý odkazuje referencie sám na seba.    

##### Ďalšie skripty
V adresári `/src/LuaScripts/Modules/server` sú umiestnené ďalšie sktipty, ktoré obsahujú definície funkcií uložených v tabuľke v *main.lua*. Využívajú inštanciu objektu `core` na prístup ku grafu, layoutovaču a ďalším potrebným modulom. Jedná sa o:
- nodeDataColumn.lua
- edgeDataColumn.lua
- layouting.lua
- magnets.lua
- operators.lua
- diagrams.lua
- util.lua