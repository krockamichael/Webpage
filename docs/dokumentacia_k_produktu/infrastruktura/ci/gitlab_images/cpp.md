# C++ moduly

Image slúži na zreťazené spracovanie modulov naprogramovaných v jazyku C++. Image je založený na Ubuntu 18.04 a obsahuje nainštalované závislosti potrebné na zostavenie, testovanie a dokumentáciu jednotlivých modulov, vrátane exportu dokumentácie na vzdialený server.

## Závislosti
`gcc` - súbor kompilátorov projektu GNU (C/C++)

`cmake` - nástroj pre multiplatformové zostavenie projektu - vytvára adresárovú štruktúru a pripravuje zdrojové súbory pre zostavenie kompilátormi príslušného operačného systému

`make` - nástroj pre automatizované zostavenie vykonateľných programov alebo knižníc zo zdrojových kódov - vstupom je tzv. Makefile súbor, ktorý obsahuje pokyny pre vytvorenie výsledného programu

`clang-tidy` - nástroj na analýzu zdrojového kódu za účelom odhalenia chýb

`iwyu (include-what-you-use)` - nástroj na analýzu `#include` direktív - každý symbol použitý v zdrojovom kóde by mal obsahovať .h súbor obsahujúci export príslušného symbolu - nástroj teda analyzuje, kedy dochádza k porušeniu a navrhuje opravy

`cppcheck` - nástroj slúži na statickú analýzu zdrojového kódu písaného v jazyku C++

`python` - interpreter jazyka Python

`python-pip` - nástroj pre inštaláciu Python balíkov

`doxygen` - nástroj na automatické generovanie dokumentácie zo zdrojového kódu

`graphviz` - nástroj pre reprezentáciu štrukturálnych informácií vo forme diagramov

`openssh-client` - secure-shell klient pre zabezpečený prístup k vzdialeným zariadeniam

`git` - distribuovaný verziovací systém

`astyle` - nástroj na automatické formátovanie zdrojového kódu

`gcovr` - nástroj na vytváranie reportu pokrytia zdrojového kódu

`rsync` - nástroj na syschronizáciu a prenos súborov medzi vzdialenými systémami

`valgrind` - nástroj na memory debugging, detekciu únikov pamäti (memory leak) a profilovanie

`setuptools` - balíkovací nástroj pre Python projekty

`cmakelint` - nástroj vykonáva statickú analýzu CMake súborov

`cpplint` - nástroj slúži na statickú analýzu kódu a overuje, či zdrojový kód v jazyku C++ spĺňa konvencie spoločnosti Google

`pygments` - zvýrazňovač syntaxe pre jazyk Python
