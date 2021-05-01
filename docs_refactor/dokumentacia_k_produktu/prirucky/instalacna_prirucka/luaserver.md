# LuaServer

Pre vývoj LuaServera je možné použiť [Visual Studio Code](https://code.visualstudio.com/) a vyvíjať v Docker kontajneri.

## Visual Studio Code

#### Príprava repozitárov a kontajnera

Na disku na ľubovoľné miesto naklonujeme repozitár `devenv` a checkoutneme sa na vetvu `develop`. Následne inicializujeme submoduly. Submoduly jednotlivých submodulov (teda závislosti lua modulov) nie je potrebne sťahovať, pretože niektoré sú nainštalované v image a zvyšné ako submoduly devenv repozitára. Potom sa v priečinku `devenv/luadev/luaserver` checkoutneme na vetvu `develop` a pullneme si zmeny. Následne vytvoríme image a spustíme kontajner.
``` bash
git clone git@gitlab.com:FIIT/Common/devenv.git
cd devenv
git checkout develop
git submodule update --init --remote
cd ./luadev/luaserver
git checkout develop
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
V docker image sa prepneme do priečinka `luadev/luaserver` a následne spustíme príkaz `lua src\LuaScripts\app\main.lua`. Týmto príkazom sa spustí luaserver a bude očakávať requesty z Unity klienta. V priečinku `src` sa nachádzajú zdrojové súbory pre server, serializér a ďalšie LuaScripty ktoré zabezpečujú vytvorenie grafu, layoutovanie a správu grafov.

Bližší opis posielania správ je v časti [Komunikácia](../../architektura_systemu/komunikacia.md).