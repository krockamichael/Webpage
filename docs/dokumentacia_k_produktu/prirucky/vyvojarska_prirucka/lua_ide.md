# IDE pre Lua

Pre vývoj Lua modulov je možné použiť [Visual Studio Code](https://code.visualstudio.com/),
[ZeroBrane Studio](https://studio.zerobrane.com/) a vyvíjať lokálne alebo v Docker kontajneri.
Odporúčame použiť Visual Studio Code, najmä kvôli použitiu docker-u a prostredia zhodného s CI.

## Visual Studio Code

#### Príprava repozitárov a kontajnera

Na disku na ľubovoľné miesto naklonujeme repozitár `devenv` a inicializujeme submoduly.
Submoduly jednotlivých submodulov (teda závislosti lua modulov) nie je potrebne sťahovať,
pretože niektoré sú nainštalované v image a zvyšné ako submoduly devenv repozitára.
Následne vytvoríme image a spustíme kontajner.
``` bash
git clone git@gitlab.com:FIIT/Common/devenv.git
cd devenv
git submodule update --init --remote
docker-compose run --service-ports --name luadev luadev
```

Kontajer stačí vytvoriť len raz, neskôr je možné ho jednoducho spustiť `docker start -i luadev`.
Ak potrebujeme image a kontajner vytvoriť nanovo, spustíme:
``` bash
docker-compose down
docker-compose build --no-cache
docker-compose run --service-ports --name luadev luadev
```

V každom repozitári by mal byť priečinok `dev` so súbormi `lrdb_debug.lua` a `start_debug.sh`.
Ak ho niektorý neobsahuje, skopírujeme ho z develop vetvy, prípadne iného repozitára.
Táto ukážka je pre použitie `luadb`, podstatné sú prvé dva riadky, kde sa akivuje debugger.
``` lua hl_lines="1 2"
lrdb = require("lrdb_server")
lrdb.activate(21110)

astManager = require "luadb.manager.AST"
extractor  = require "luadb.extraction.extractor"
path = "src"

astMan = astManager.new()
extractedGraph = extractor.extract(path, astMan)

lrdb.deactivate()
```

#### Nastavenie IDE

Do IDE nainštalujeme rozšírenie LRDB debugger nachádzajúce sa v repozitári `devenv`.
Je možné ho nainštalovať príkazom `code --install-extension lrdb-0.3.5.vsix`
alebo manuálne vo VS Code cez Extensions -> More Actions... -> Install from VSIX.
Nakoniec v IDE otvoríme priečinok `luadev` osahujúci všetky repozitáre.

#### Spustenie

Súbor `lrdb_debug.lua` slúži ako 'main', kde je ukážkové použitie danej knižnice.
Pri vývoji používame tento súbor ako pre vyvolanie vyvíjanej funkcionality,
ale zmeny v ňom necommitujeme. Pre jeho spustenie vykonáme príkaz `bash dev/start_debug.sh`.
V tomto bash skripte sa cyklicky vykonáva `lua lrdb_debug.lua`, teda nie je potrebné
ho vždy manuálne spúšťať. Ukončenie skriptu sa realizuje štandardne pomocou Ctrl+C.

- !!! tip "Tip"
    - Pri debugovaní používame ako pracovný adresár samotný repozitár,
      teda napríklad `cd /luadev/luadb`

Po spustení `lrdb_debug.lua` je vykonávanie pozastavené a čaká na pripojenie IDE.
Pre pripojenie vo VS Code stlačíme klávesu F5.


## ZeroBrane Studio

ZeroBrane Studio je oveľa jednoduchšie na nastavenie ako VSCode,
avšak doposiaľ sa nám v ňom nepodarilo spojazdniť remote-debugging.
Taktiež je VSCode uživateľsky oveľa prívetivejšie prostredie na prácu.
Z týchto dôvodov odporúčame použiť skôr VSCode a teda postup popísaný vyššie.
Takisto je treba poznamenať, že v tomto IDE je možné debugovať len jazyk LUA, nie TERRA.

#### Nastavenie IDE

Štandardne je IDE nastavené tak, že pri debugovaní je potrebné mať otvorené všetky súbory,
do ktorých môže program počas behu vojsť. Preto musíme pred začatím nastaviť IDE tak,
aby volané moduly otváralo automaticky. Toto spravíme v
`Menu => Edit => Preferences => Settings: User`. Otvorí sa nám konfiguračný súbor
`user.lua`, do ktorého na nový riadok pridáme príkaz
```
editor.autoactivate = true
```
a následne zmeny uložíme a môžme súbor zavrieť. Týmto je IDE pripravené na debuggovanie.

#### Príprava

V IDE si otvoríme ako projekt adresár s LUA skriptami.
Ten je v projekte `3dsoftviz` uložený na tomto mieste:
`<cesta-k-projektu>\3dsoftvis_remake\Projects\3DSoftviz\UnityProject\Assets\StreamingAssets\LuaScripts`.
V podadresári `App` si vytvoríme súbor `debug.lua`, do ktorého vložíme nasledovný kus kódu.
``` lua
asset_directory = "<cesta-k-projektu>/3dsoftvis_remake/Projects/3DSoftviz/UnityProject/Assets/StreamingAssets/LuaScripts"

local paths = {
    "/Modules/?.lua",
    "/Modules/?/init.lua"
}

local cpaths = {
    "/Modules/?.dll",
    "/Modules/loadall.dll",
    "/Modules/?.so",
    "/Modules/loadall.so",
    "/Modules/?.dylib",
    "/Modules/loadall.dylib"
}

local function appendPath(path, prefix, pathsToAppend)
    path = path or "."
    for _, pathToAppend in ipairs(pathsToAppend) do
        path = path .. ";" .. prefix .. pathToAppend
    end
    return path
end

package.path        = appendPath(package.path, asset_directory, paths)
package.cpath       = appendPath(package.cpath, asset_directory, cpaths)
```
V prvom riadku zameníme placeholder `<cesta-k-projektu>` za cestu k 3dsoftviz
projektu na našom filesystéme. Následne je IDE pripravené na debugovanie.
Kód ktorý chceme debugovať píšeme za vložený kus kódu do súboru `debug.lua`.
Debugovanie funguje rovnako ako v iných IDE.
