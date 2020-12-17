# LuaServer

Pre vývoj LuaServera je možné použiť [Visual Studio Code](https://code.visualstudio.com/) a vyvíjať 
v Docker kontajneri.

## Visual Studio Code

#### Príprava repozitárov a kontajnera

Na disku na ľubovoľné miesto naklonujeme repozitár `devenv` a checkoutneme sa na vetvu `feature/krocka-include-luaserver`.
Následne inicializujeme submoduly. Submoduly jednotlivých submodulov (teda závislosti lua modulov) 
nie je potrebne sťahovať, pretože niektoré sú nainštalované v image a zvyšné ako submoduly devenv repozitára. Potom sa 
v priečinku `devenv/luadev/luaserver` checkoutneme na vetvu `feature/souc-luaserver` a pullneme si zmeny.
Následne vytvoríme image a spustíme kontajner.
``` bash
git clone git@gitlab.com:FIIT/Common/devenv.git
cd devenv
git checkout feature/krocka-include-luaserver
git submodule update --init --remote
cd luadev/luaserver
git checkout feature/souc-luaserver
git pull
docker-compose run --service-ports --name luadev luadev
```

Kontajer stačí vytvoriť len raz, neskôr je možné ho jednoducho spustiť `docker start -i luadev`.
Ak potrebujeme image a kontajner vytvoriť nanovo, spustíme:
``` bash
docker-compose down
docker-compose build --no-cache
docker-compose run --service-ports --name luadev luadev
```

Postup ako debugovať pomocou modulu lrdb_server je opísany v časti [IDE pre Lua](lua_ide.md)

#### Spustenie
V docker image sa prepneme do priečinka `luadev/luaserver` a následne spustíme príkaz `lua app/main.lua`.
Týmto príkazom sa spustí luaserver a bude očakávať requesty z Unity klienta.

V priečinku `src` sa nachádzajú zdrojové súbory pre server, serializér a ďalšie LuaScripty ktoré zabezpečujú vytvorenie
grafu, layoutovanie a správu grafov. V tomto momente obsahuje `LuaScripts` priečinok viacero modulov ktoré nie sú potrebné
a v budúcnosti ich plánujeme odstrániť.

##Posielanie správ
Posielanie správ je zabezpečené MessagePackom a knižnicou ZeroMQ. Správy sú posielané vo formáte 
``` bash
[1] názov funkcie ktorá sa má vykonať
[2] parametre funkcie v JSON formáte (aktuálne iba ako pole stringov, JSON v budúcnosti)
[3] výstup funkcie v JSON formáte
```

Unity klient pošle správu s názvom funkcie a parametrami, pričom časť pre výstup nechá prázdny. Luaserver správu spracuje
a vykoná funkciu s príslušnými parametrami a do časti pre výstup vloží výstup funkcie. Takúto správu odošle klientovi na
Unity strane, ktorý si ďalej výstup deserializuje a pracuje s ním ako s objektom. 

##Klient Unity
Unity strana má vytvorený skript v triede NetHandler.cs, ktorý je zodpovedný za odosielanie a prijímanie takýchto správ pomocou
metódy `send()`. Deserializácia odpovede sa zaobstaráva na mieste kde bola metóda `send()` volaná, teda nie priamo vo metóde `send()`.
Skript pre NetHandler je v tomto momente uložený v priečinku `3dsoftvis_remake\Projects\3DSoftviz\UnityProject\Assets\Scripts` v 
solution `Softviz`, no plánujeme ho premiestniť do solution `GraphCore`. V solution `GraphCore` sa priraďujú hodnoty uzlom a hranám,
preto sme sa zhodli že bude ideálne na týchto miestach posielať správy a spracovávať ich výstup z Luaservera.
