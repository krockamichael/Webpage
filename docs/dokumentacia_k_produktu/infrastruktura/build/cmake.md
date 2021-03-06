# CMake
V rámci celého projektu je použitý nástroj CMake, ktorý výrazne zjednodušuje zostavovanie, testovanie a balíkovanie projektu. Každý modul, ktorý využíva CMake obsahuje konfiguračný súbor `CMakeLists.txt`. Na základe konfiguračného súboru je potom vytvorený jeden alebo viacero `Makefiles` na Unix platformách, prípadne `projekt/workspace` na platforme Windows.
Výhod tohto riešenia je viacero, medzi hlavné patria :
 - podpora viacnásobnej závislosti,
 - spolupráca s nástrojom Git,
 - možnosť definície makier, príkazov a funkcií,
 - možnosť definovať poradie vykonávania - závislosť pri kompilácii a linkovaní.
 - možnosť parametrizovať správanie
 - podpora multiplatformových riešení

## Prehľad základných príkazov
- **set**
    - slúži na nastavenie hodnoty premennej,
- **option**
    - konfigurovateľný prepínač - umožňuje interaktívne meniť parametre,
- **add_library**
    - pridá build target pre knižnicu, ktorá sa zostaví zo zdrojových súborov zadaných ako parameter,
- **add_dependencies**
    - pridá závislosť pre target, čo tiež znamená, že závislosť musí byť zostavená skôr ako target, ktorý je od nej závislý,
- **ExternalProject_Add**
    - umožňuje pridať externý projekt, čím dôjde k vytvoreniu nového target-u,
- **set_target_properties**
    - príkazom je možné meniť vlastnosti target-u,
- **message**
    - umožňuje vypísať správu do konzoly,
- **add_custom_command**
    - príkazom je možné vytvoriť vlastný príkaz, v ktorom je možné špecifikovať závislosti, command-line-príkaz a správu, ktorá sa má vypísať do konzoly,
- **add_custom_target**
    - pridá target so zadaným menom, ktorý vykoná požadované príkazy,
- **install**
    - príkaz generuje inštalačné pravidlá pre projekt,
    - na zdrojový adresár je možné aplikovať viaceré príkazy,
    - základné použitie v projekte zahŕňa kopírovanie súborov závislostí do adresárovej štruktúry projektu.

CMake ďalej podporuje štandardnú syntax pre vetvenie a cykly.

## Poznámky
Pri vytváraní alebo modifikácii `CMakeLists.txt` súborov treba dodržiavať Unix adresárovú štruktúru.

   - knižnice uchovávať v adresári s názvom `lib`,
   - hlavičkové súbory v adresári s názvom `include`,
   - spustiteľné súbory v adresári s názvom `bin`,
   - ostatné súbory modulov (licence, readme) v adresári s názvom `share`.

Adresár s názvom `cmake` v koreňovom adresári repozitára obsahuje súbory určené na hľadanie závislostí, akými sú hlavičkové súbory, knižnice, spustiteľné súbory a pod. Spravidla je potrebné vytvoriť takýto súbor na úrovni jednotlivých modulov.
CMake umožňuje ďalej definovať množinu viacerých možných názvov hľadaných súborov a ciest. Vyhľadanie závislostí je potom potrebné explicitne zavolať v súbore `CMakeLists.txt` príkazom `find_package`.

[Help](https://cmake.org/cmake/help/v3.0/)
