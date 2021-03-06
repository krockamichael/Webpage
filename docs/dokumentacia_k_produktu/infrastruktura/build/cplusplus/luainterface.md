# LuaInterface

Generovanie build súborov pre modul LuaInterface je realizované prostredníctvom nástroja CMake. Jednotlivé kroky, závislosti a voliteľné súčasti sa nachádzajú v súbore `CMakeLists.txt` v koreňovom adresári modulu.

## Prepínače

Pri zostavovaní modulu je možné použiť viacero prepínačov.

### USE_COTIRE

Použitím prepínača je možné použiť modul `Cotire` na urýchlenie build procesu.

### DOWNLOAD_AND_BUILD_LUA

Pri použití prepínača je stiahnutá a zbuildovaná zdieľaná knižnica pre prácu s programovacím jazykom `Lua`.

### USE_TERRA_BINARIES

Prepínač umožňuje použiť nadstavbu nad jazykom Lua - `Terra`.

### DOWNLOAD_AND_BUILD_SOL2

Použitím prepínača bude stiahnutá a zbuildovaná knižnica `Sol2`, ktorá slúži ako wrapper nad jazykom Lua pre programovací jazyk `C++`.

### BUILD_LUAINTERFACE_TESTS

Použitie prepínača spôsobí, že spolu so zdieľanou knižnicou `luainterface` bude zbuildovaný aj spustiteľný súbor vykonávajúci jednotkové testy modulu.

### USE_STRICT_COMPILE_WARNINGS

Pri `DEBUG` režime budú použité striktné varovania kompilátora.

### USE_CODE_COVERAGE

Prostredníctvom nástroja `gcovr` bude vygenerovaný report pokrytia zdrojového kódu.

### USE_INCLUDE_WHAT_YOU_USE

Pri použití prepínača bude vykonaná analýza zdrojových súborov v jazyku C++ `include-what-you-use` - IWYU.

### USE_CLANG_TIDY

Použitím prepínača bude vykonaná analýza zdrojových kódov za účelom odhalenia programovacích chýb, nesprávneho použitia rozhraní, prípadne ďalších chýb.

## Závislosti

Pre build modulu sú potrebné nasledujúce závislosti :

 - `Terra` (v prípade implementácie pre macOS je zahrnutá v implementácii Luapower)
 - `Lua` (v prípade implementácie pre macOS je použitá implementácia LuaJIT, ktorá je súčasťou balíka Luapower)
 - `Sol2` (v prípade použitia prepínača)
 - `Easyloggingpp` - logovací modul pre jazyk C++
 - `Catch2` (v prípade použitia prepínača BUILD_LUAINTERFACE_TESTS) - framework pre jednotkové testovanie v jazyku C++
 - `include-what-you-use` (v prípade použitia prepínača USE_INCLUDE_WHAT_YOU_USE) - nástroj na analýzu zdrojových súborov v jazyku C a C++
 - `clang-tidy` (v prípade použitia prepínača USE_CLANG_TIDY) - nástroj na analýzu zdrojového kódu za účelom odhalenia chýb
 - `cpplint` - nástroj slúži na statickú analýzu kódu a overuje, či zdrojový kód v jazyku C++ spĺňa konvencie spoločnosti Google
 - `cppcheck` - nástroj slúži na statickú analýzu zdrojového kódu písaného v jazyku C++
 - `cmakelint` - nástroj vykonáva statickú analýzu CMake súborov
 - `astyle` - nástroj na automatické formátovanie zdrojového kódu
 - `doxygen` - nástroj na automatické generovanie dokumentácie zo zdrojového kódu

## Build modulu

### Prerekvizity

 - `CMake 3.15.4`
  - CMake je nástroj na správu procesu zostavovania softvéru, podporuje adresárovú hierarchiu a viacnásobné závislosti.  
 - `Doxygen 1.8.16`
  - Doxygen je nástroj na generovanie dokumentácie z anotovaného zdrojového kódu aplikácie.
 - `Git`
  - potrebné je nahrať svoj verejný kľúč na **GitLab**, ale aj **GitHub**

### Naklonovanie repozitára

 - pokiaľ sme nastavili SSH kľúč, repozitár naklonujeme prostredníctvom SSH `git clone git@gitlab.com:FIIT/Common/Cpp/LuaInterface.git` a prejdeme do adresára `cd luainterface/`,

### Výber vetvy

 - príkazom `git checkout remake` vyberieme požadovanú vetvu - v našom prípade označenú remake

### Kofigurácia build systému

 - otvoríme program CMake,
 - ako `source code` zvolíme priečinok `luainterface`,
 - ako `build binaries` zvolíme priečinok `luainterface/_build`,
 - stlačíme tlačidlo configure,
 - ako generátor použijeme `Unix Makefiles` v prípade macOS a Linux, inak `Visual Studio 15 2017 Win64` (alebo inú verziu Visual Studio) a vyberieme možnosť `Use default native compilers`,
 - zvolíme prepínače `DOWNLOAD_AND_BUILD_SOL2`, `BUILD_LUAINTERFACE_TESTS` a `DOWNLOAD_AND_BUILD_LUA`
 - ako `CMAKE_INSTALL_PREFIX` zvolíme priečinok `luainterface/_install`,
 - stlačíme tlačidlo configure,
 - stlačíme tlačidlo generate

### Build modulu

V prípade MS Windows je možné build vykonať v nástroji Visual Studio :

 - Otvoríme projekt
 - Pravým tlačidlom stlačíme Solution LuaInterface
 - Vyberieme možnosť Build Solution

Pri platforme macOS postupujeme nasledujúcim spôsobom :

 - prejdeme do adresára so súbormi vygenerovanými nástrojom CMake `cd luainterface/_build`
 - spustíme build modulu `make install`
 - overíme, či boli súbory zbuildované a nakopírované do adresára luainterface/_install
