# Ako písať testy

Metodika testovania sa týka všetkých členov tímu, pričom definuje spôsob písania
a spúšťania testov. Nakoľko sa vyžaduje otestovanie každej logickej časti modulu,
dôraz kladieme na testovanie hraničných prípadov. Testy sa vyvárajú programátorské,
jednotkové, ale aj integračné, pričom musia pokývať aj určitú časť funkcionality.

#### Pravidlá písania testov

- Dodržiavať
    * dĺžku vykonania testu - aby bola čo najkratšia
    * hraničné prípady
    * otestovanie čo najviac možných scenárov danej funkcionality

Písanie testov by nemalo zabrať viac ako 40% času vývoja produktu.

Programátoské testy vykonáva iný programátor, ako ten ktorý bol autorom zdrojového kódu.
Program je v tomto stupni kontrolovaný na úrovni zdrojového kódu.

Jednotkové testy by mali byť písané tak, aby overovali práve jednu funkcionalitu,
akonáhle sa jednotkový test skladá z viacerých častí, ktoré sa dajú dekomponovať,
je potrebné rozdeliť tieto časti do viacerých jednotkových testov.

Integračné testy budú vykonávané vo väčšine prípadov manuálne.

#### Údržba testov

Pri zmene logiky kódu sa môže stať, že dané testy už viac nie sú aktuálne
a je potrebné ich upraviť. V takom prípade treba opäť zvážiť, či daná úprava
overuje dostatočne veľa hraničných prípadov, či jeho dĺžka vykonania po zmene
nie je neprimerane veľká a či testuje dostatok možných scenárov danej funkcionality.

#### Code coverage

Code coverage je pokrytie kódu automatizovanými testami. Je vyjadrený v percentách
a je možné merať ho viacerými spôsobmi. Využívame prístup merať code coverage
prostredníctvom line coverage - pomer riadkov kódu, ktoré sa vykonajú počas
testovania ku počtu riadkov kódu, ktoré sa počas testovania nevykonajú.
Každý modul produktu by mal mať minimálne 50% code coverage a celkové
pokrytie projektu by malo mať aspoň 75% code coverage.

#### Zmazanie testu

Pokiaľ čas vykonania testu je neprimerane veľký, alebo čas strávený údržbou testu je príliš veľký,
je potrebné tento test zmazať z dôvodu, aby nezdržoval vývoj.
Písanie testov a ich údržba nesmie byť nadradená samotnému vývoju.
Ak čas vykonania testu je príliš veľký, tak vývojári nemajú záujem spúšťať
automatizované testy dostatočne často počas vývoja a tento prístup je nežiaduci
z dôvodu neskorého odhalenia chýb.
