# LuaInterface
Pipeline sa skladá z `before_script` a 4 stage. Celá pipeline využíva image `registry.gitlab.com/fiit/common/ci-images/cpp`, ktorý obsahuje potrebné závislosti pre zostavovanie, testovanie a dokumentáciu modulov vytvorených v jazyku C++.

## Premenné
V súbore `gitlab-ci.yml` je definovaných viacero premenných :
 - CMAKE_MANDATORY - obsahuje parametre pre CMake
 - CCACHE_BASEDIR - cesta k pracovnému adresáru pre `ccache`
 - CCACHE_DIR - adresár pre `ccache`

## `before_script`
 - nastavenie SSH klúčov
 - vytvorenie adresáru pre `ccache`
 - prechod do koreňového adresáru modulu
 - klonovanie submodulov

## `build` stage
 - vytvorenie `build` adresáru
 - generovanie build systému modulu s parametrami uloženými v premennej `CMAKE_MANDATORY`
 - build modulu

## `QA` stage
Táto úroveň vykonáva testovanie a zabezpečuje udržiavanie kvality zdrojového kódu.

`make_tests`
Úloha vykoná build testov prostredníctvom nástrojov CMake a Make. Následne sú vykonané jednotkové testy. Taktiež sa v rámci tejto úlohy vykoná analýza pokrytia zdrojového kódu prostredníctvom nástroja `gcovr`.

`make_cppcheck`
V rámci úlohy je vykonaná statická analýza zdrojového kódu písaného v jazyku C++ nástrojom `cppcheck`.

`make_cpplint`
Úloha prostredníctvom nástroja `cpplint` vykoná ďalšiu statickú analýzu kódu a overí, či zdrojový kód v jazyku C++ spĺňa konvencie spoločnosti Google.

`make_cmakelint`
Poslednou úlohou úrovne je statická analýza CMake súborov nástrojom `cmakelint`.

## `docs` stage
 - generovanie dokumentácie zo zdrojového kódu nástrojom `doxygen`

`extract code snippets`
Úloha generuje code snippety pomocou [doc-extra/snippet-extract.py](../gitlab_images/doc_extra.md)

## Artefakty
`_build` - priečinok obsahuje všetky súbory, ktoré vznikli počas vykonávania úlohy `make_tests`

`_build/coverage` - priečinok obsahuje výsledky analýzy pokrytia zdrojového kódu testami vo forme `html`

`_build/tests` - priečinok obsahuje výsledky jednotkových testov vo formáte `txt`

`cpplint-report.txt` - výstup statickej analýzy C++ zdrojového kódu nástrojom `cpplint`

`_build/cppcheck` - adresár obsahuje výstup statickej analýzy zdrojového kódu nástrojom `cppcheck`

`cmakelint-report.txt` - výstup statickej analýzy CMake súborov nástrojom `cmakelint`

`_build/luainterface-techdoc` - priečinok obsahuje dokumentáciu vygenerovanú zo zdrojového kódu nástrojom `doxygen`

### `deploy_docs` stage
Úlohou úrovne je export automatickej dokumentácie zdrojového kódu na vzdialený server zhromažďujúci všetku dokumentáciu - high-level aj low-level.

`deploy_doxygen`
Úloha exportuje prostredníctvom programu `rsync` vygenerovanú Doxygen dokumentáciu úrovne `docs` - priečinok `luainterface-techdoc` - v HTML formáte na vzdialený server.
