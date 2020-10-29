# LuaMeg

Generovanie build súborov pre modul LuaMeg je realizované prostredníctvom nástroja CMake. Jednotlivé kroky, závislosti a voliteľné súčasti sa nachádzajú v súbore `CMakeLists.txt` v koreňovom adresári modulu.

## Prepínače

### BUILD_STANDALONE

Použitie prepínača umožní zostaviť modul LuaMeg so všetkými závislosťami za účelom testovania.

## Závislosti

Pre build modulu sú potrebné nasledujúce závislosti :

- `luadb` - modul na analýzu zdrojového kódu, komplexity, a rôzne metrík, na základe ktorých sa neskôr ostatné moduly rozhodujú o vlastnostiach vykreslenia uzlov

## Build modulu

### Prerekvizity

 - `CMake`- CMake je nástroj na správu procesu zostavovania softvéru, podporuje adresárovú hierarchiu a viacnásobné závislosti.  
 - `Git`- Potrebné je nahrať svoj verejný kľúč na **GitLab**, ale aj **GitHub**

### Naklonovanie repozitára

 - pokiaľ sme nastavili SSH kľúč, repozitár naklonujeme prostredníctvom SSH `git clone git@gitlab.com:FIIT/Common/Lua/luameg.git` a prejdeme do adresára `cd luameg/`,

### Výber vetvy

 - príkazom `git checkout` vyberieme požadovanú vetvu

### Inicializácia submodulov

Inicializáciu potrebných submodulov vykonáme príkazom `git submodule update --init`

### Kofigurácia build systému

 - vytvoríme adresár `_build` príkazom `mkdir _build`,
 - príkazom `cd _build` prejdeme do adresára `_build`,
 - spustíme príkaz `cmake -D BUILD_STANDALONE=ON ..`,

### Build modulu

 - prejdeme do adresára so súbormi vygenerovanými nástrojom CMake `cd luameg/_build`
 - spustíme build modulu a jeho závislostí `make install`
 - nainštalovaný modul a jeho závislosti je možné nájsť v adresári `../_install`.
