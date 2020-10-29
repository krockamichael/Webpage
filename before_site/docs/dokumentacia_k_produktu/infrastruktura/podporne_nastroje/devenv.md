# Vývojárske prostredie

Vývojárske prostredie - [devenv](https://gitlab.com/FIIT/Common/devenv) - umožňuje lokálny vývoj a ladenie aplikácií. Základom je použitie CI image.
Aby bolo možné čo najviac sa priblížiť prostrediu CI, prostredie bolo prispôsobené potrebám lokálneho vývoja prostredníctvom prostriedkov
`docker-compose`, pričom image zostal nezmenený oproti CI.

Riešenie je implementované vo forme kontajnerov, čo umožňuje ďalšie budúce rozšírenie. Súčasťou riešenia sú aj všetky potrebné závislosti, ktoré sú buď
priamo obsiahnuté v repozitári, alebo vo forme Git submodulov. Momentálne je v riešení podporovaný lokálny vývoj modulov v programovacom jazyku Lua
prostredníctvom kontajnera `luadev`.

## Luadev
Luadev je kontajner, ktorý umožňuje lokálny vývoj, vrátane ladenia, testovania a code coverage modulov v programovacom jazyku Lua.
Prostredie vychádza z [Lua CI Image](https://gitlab.com/FIIT/Common/ci-images/-/tree/master/lua).  
Najzásadnejší rozdiel oproti prostrediu CI je mierna modifikácia ciest LUA_PATH a LUA_CPATH. Systémové cesty zostali zachované, rovnako ako aj celá
štruktúra použitého CI image. K zmene došlo v cestách LUA_PATH_ADD a LUA_CPATH_ADD.

Image bol navrhnutý tak, aby tieto premenné bolo možné prekonať v závislosti od prostredia, v ktorom bude nasadený - CI alebo lokálny vývoj.
Rovnako ako aj pri samotnom image platí, že systémové cesty, t.j. LUA_PATH a LUA_CPATH by sa nemali meniť ! Je ich možné a podľa prostredia vhodné mierne
prispôsobiť argumentami LUA_PATH_ADD a LUA_CPATH_ADD.
```
args:
    LUA_PATH_ADD: "\
                src/?/init.lua;src/?.lua;\
                /luadev/luadb/src/?/init.lua;/luadev/luadb/src/?.lua;\
                /luadev/luameg/src/?/init.lua;/luadev/luameg/src/?.lua;\
                /luadev/luametrics/src/?/init.lua;/luadev/luametrics/src/?.lua;\
                /luadev/luagit/src/?/init.lua;/luadev/luagit/src/?.lua;\
                /luadev/luatree/src/?/init.lua;/luadev/luatree/src/?.lua"
    LUA_CPATH_ADD: ""
```
V tomto prípade nie je potrebné použiť špecifickú cestu LUA_CPATH, a tak má premenná LUA_CPATH_ADD hodnotu prázdneho reťazca.

### Závislosti
Prostredie luadev má niekoľko závislostí, ktoré sú buď umiestnené priamo v repozitári, alebo majú formu Git submodulov.

#### Lua CI Image
  - CI Image pre Lua moduly obsahujúci všetky závislosti na spustenie, ladenie, testovanie a code coverage,  
  má formu Git submodulu  
  - Pokiaľ nie je image dostupný lokálne, bude zostavený pomocou `Dockerfile`, ktorý bude po inicializácii  
  submodulov dostupný v koreňovom adresári `devenv`

#### vscode-lrdb
  - Plugin pre IDE Visual Studio Code, ktorý umožňuje ladenie aplikácií v prostredí Docker kontajneru, vo vývojovom prostredí
  používame vlastný fork [vscode-lrdb](https://github.com/kapecp/vscode-lrdb), ktorý umožňuje prácu s absolútnymi cestami,
  plugin je umiestnený priamo v repozitári [devenv](https://gitlab.com/FIIT/Common/devenv) vo formáte vsix

### Prerekvizity
Medzi prerekvizity patria :  
  - [Visual Studio Code](https://code.visualstudio.com/)  
  - [Docker](https://docs.docker.com/get-docker/)  
  - [Docker-compose](https://docs.docker.com/compose/install/)

### Moduly
Primárnym účelom prostredia luadev je lokálny vývoj Lua modulov, z tohto dôvodu sú jednotlivé moduly, ktoré sú vyvíjané v
rámci projektu 3DSoftviz umiestnené v repozitári vo forme Git submodulov.  
Príkazom `git submodule update --init --remote` dôjde k inicializácii a aktualizácii všetkých Git submodulov. Moduly sú následne
umiestnené do adresára `luadev`, ktorý slúži ako pracovný adresár pri lokálnom vývoji.

### Zväzky
Na prezistenciu údajov v prostredí luadev je použitý adresár `luadev`, ktorý je súčasťou repozitára. Do tohto adresára sú inicializované všetky
vyvíjané moduly, v ktorých je následne možné vykonávať požadované zmeny, testovať ich alebo ladiť.  
Adresár `devenv/luadev/` hostiteľského stroja je mapovaný na adresár `/luadev/` kontajnera. Tento adresár je zároveň nastavený ako
pracovný adresár.
```
volumes:
    - ./luadev:/luadev
working_dir: /luadev
```
### Porty
Kvôli správnej funkčnosti LRDB debuggera je potrebné správne mapovanie portu kontajnera na port hostiteľského stroja,
cez ktorý bude prebiehať komunikácia medzi IDE Visual Studio Code a kontajnerom.  
Port musí korešpondovať s konfiguráciou LRDB na hostiteľskom stroji, rovnako ako s portom použitým v main súbore
určenom pre ladenie, ktorý by sa mal nachádzať v príslušnom repozitári. O konfigurácii je možné dozvedieť sa viac v
[príručke pre vývojárov](../../prirucky/vyvojarska_prirucka/lua_ide.md)
alebo [dokumentácii k Lua CI Image](../ci/gitlab_images/lua.md). Predvolený je port 21110.  
Mapovanie portu 49155 je uvedené kvôli ukážke RPC medzi serverovou časťou vo forme kontajnera a klientskou časťou. 
Viac informácií o RPC je možné nájsť v dokumentácii [možností komunikácie](../../architektura_systemu/komunikacia.md).
```
ports:
    - "21110:21110"
    - "49155:49155" 

```
### Spustenie
Pred prvým spustením je potrebná inštalácia pluginu [vscode-lrdb](https://github.com/kapecp/vscode-lrdb) do IDE Visual Studio Code. Taktiež môže byť
potrebná jednoduchá konfigurácia pre konkrétny repozitár. Odporúčané je postupovať podľa [príručky pre vývojára](../../prirucky/vyvojarska_prirucka/lua_ide.md).  

### Poznámky
Rozdielom medzi prostredím CI a prostredím pre lokálny vývoj, ktorý súvisí s modifikovanými cestami LUA_PATH a LUA_CPATH, je nepoužitie
nástoja `CMake`. Nakoľko vo vývojovom prostredí máme k dispozícii všetky potrebné moduly, ktoré môžu predstavovať navzájom
závislosti, nie je potrebná ich inštalácia ako v prípade prostredia CI, kedy bol pre každý modul vytvorený adresár `_install`
obsahujúci samotný modul a jeho závislosti. V prípade vývojového prostredia je toto správanie modifikované prostredíctvom
modifikovanej cesty LUA_PATH_ADD. Jednotlivé moduly hľadá interpreter v adresári `src` príslušného modulu.  
V prípade pridania ďalšieho modulu je potrebné doplniť cestu do argumentu LUA_PATH_ADD v súbore `docker-compose.yml`.

V súbore `docker-compose.yml` je definovaný ako preferovaný režim interaktívny, t.j. konzola operačného systému Linux Ubuntu , v ktorej je možné
vykonávať požadované operácie.
```
stdin_open: true
tty: true
```
