# 3DSoftvis_Remake
Build systém projektu 3DSoftvis_Remake je zložený z veľkého množstva modulov, ktoré do projektu vnášajú značnú mieru závislosti.
Tým je komplexnosť celého riešenia zvýšená. Zároveň však umožňuje modifikovať projekt na úrovni jednotlivých modulov.
Zložitosť celého riešenia spočíva v prepojení 3 programovacích jazykov (pokiaľ nepočítame syntax CMake). V jazyku Lua sú reprezentované
jednotlivé grafové štruktúry. Unity, v ktorom je vytvorená prezenčná časť aplikácie na svoju činnosť využíva moduly, ktoré sú
vytvorené v jazyku C#. Aby však bolo možné zabezpečiť komunikáciu medzi jazykmi Lua a C#, je nevyhnutné použiť jazyk C++, v ktorom sú
implementované moduly `LuaInterface` a `LuaGraph`.

Build systém projektu musí teda zabezpečiť build jednotlivých C++ modulov a aj C# modulov a následne ich skopírovať do príslušnej adresárovej
štruktúry.

V projekte Unity používa C# moduly. C# moduly k svojej činnosti potrebujú dynamické knižnice vytvorené v C++ - `LuaInterface` a `LuaGraph`.
C++ prostredníctvom knižníc, bližšie špecifikovaných pri obidvoch moduloch, dokáže komunikovať s jazykom Lua, prípadne jeho nadstavbou - Terra.

Testovanie C# modulov je realizované prostredníctvom frameworku NUnit.

Pokyny pre build projektu pre platformy MS Windows a macOS sú uvedené v inštalačnej príručke.

## Prerekvizity
Prerekvizity uvádzame v inštalačnej príručke pre
[Windows](../../prirucky/instalacna_prirucka/windows.md)
a [macOS](../../prirucky/instalacna_prirucka/macos.md).

## Prepínače
Pri zostavovaní projektu je možné použiť viacero prepínačov.

### BUILD_UNITY
Použitím prepínača bude zbuildovaná aj Unity časť projektu - je potrebné mať Unity nainštalované.

### BUILD_SOFTVIZ_MODULES_TESTS
Použitie prepínača spôsobí, že budú zbuildované jednotkové testy C# modulov.

### RUN_IMPORTER_TEST
S použitím prepínača dôjde k spusteniu testu importovania grafu prostredníctvom modulu `Busted`

### USE_TERRA_BINARIES
Prepínač umožňuje použiť nadstavbu nad jazykom Lua - `Terra`.

## Závislosti
Pre build modulu sú potrebné nasledujúce závislosti :

 - `Terra` (v prípade implementácie pre macOS je zahrnutá v implementácii Luapower)
 - `Lua` (v prípade implementácie pre macOS je použitá implementácia LuaJIT, ktorá je súčasťou balíka Luapower)
 - `LuaGraph` - modul na prácu s grafovými štruktúrami (modul automaticky stiahne a zbuilduje aj modul `LuaInterface` - rozhranie medzi jazykmi C#, C++ a Lua)
 - `doxygen` - nástroj na automatické generovanie dokumentácie zo zdrojového kódu
 - `lpeg` - knižnica pre porovnanie textových dát v jazyku Lua
 - `leg` - knižnica exportuje kompletnú gramatiku Lua 5.1 a API pre manipuláciu
 - `luametrics` - knižnica pre analýzu metrík zdrojového kódu
 - `luafilesystem` - súborový systém pre jazyk Lua
 - `lualogging` - API na logovanie v jazyku Lua
 - `StackTracePlus` - modul poskytuje vylepšený StackTrace pre debug v jazyku Lua
 - `luasocket` - sieťová podpora pre jazyk Lua
 - `mobdebug` - vzdialený debugger pre jazyk Lua
 - `luacov` - analyzátor pokrytia zdrojového kódu
 - `luacheck` - statický analyzátor jazyka Lua
 - `lua_cliargs` - knižnica na spracovanie command-line argumentov
 - `luasystem` - platformovo nezávislá knižnica na vykonávanie systémových volaní
 - `dkjson` - JSON modul pre jazyk Lua
 - `say` - modul pre ukladanie mapovaní kľúč-hodnota
 - `luassert` - rozšírený testovací modul
 - `lua-term` - knižnica pre prácu s terminálom
 - `penlight` - knižnica poskytuje input data handling, funkcionálne programovanie a správu ciest OS
 - `mediator_lua` - knižnica na správu udalostí (events)
 - `busted` - framework pre testovanie
 - `luacomments` - parser Lua komentárov
 - `luameg` - Moonscript parser
 - `luadb` - modul na analýzu hypergraph štruktúr
 - `luagit` - modul pre jazyk Lua umožňujúci prístup ku Git repozitárom
