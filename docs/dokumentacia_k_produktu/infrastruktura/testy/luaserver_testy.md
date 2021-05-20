## Dokumentácia k testom na luaserver

[Oficiálna dokumentácia k nástroju busted](https://olivinelabs.com/busted/)

### Štruktúra testov

Testy písané v jazyku lua a spúšťané pomocou busted majú svoju štruktúru. Základnými blokmi v testoch sú bloky `describe` a `it`. Každý test má svoj vlastný `it` blok, pričom viacero testov je zoskupených v bloku `describe`. Oba tieto bloky majú zvláštnu syntax, prvým argumentom je názov bloku/testu, druhým je callback, ktorý už vykonáva zadané príkazy. Blok `describe` môže mať v sebe vnorených viacero blokov `describe`, v našom projekte však takúto možnosť nevyužívame. V bloku `it` (priamo v teste) vykonáme čo potrebujeme a skontrolujeme výstupy pomocou `assert.are.same(expected_output, real_output)` alebo `assert.are.equal(expected_output, real_output)`. Spôsobov, ako skontrolovať výstupy, je viacero a je možné ich nájsť v oficiálnej busted dokumentácii.
Ďalším použitým blokom je blok `setup`, ktorý sa nachádza v describe bloku a vykonáva sa raz pred všetkými testami. Posledným blokom je blok `expose` a ten si vysvetlíme v neskoršej časti. 

### Spúšťanie testov

Spúšťanie testov prebiehalo donedávna veľmi jednoducho, stačilo sa v dockeri nastaviť do priečinka `/luadev/luaserver/` (alebo do iného lua modulu, napr. luadb, luagit, atď., ktorý obsahuje priečinok `spec/`) a zadať príkaz `busted` alebo `busted -c`. Tento príkaz zobral všetky súbory z priečinka `spec/`, ktoré v názve obsahujú reťazec `_spec` a naraz ich spustil. Problém však nastával v tom, že ak nejaký test vyžadoval prítomnosť `terra` knižnice, nasledujúci test a všetky ďalšie sa nechceli vykonať. Samostatne bolo možné tieto testy bez problémov spustiť. 

Preto sme vytvorili bash skript, ktorý do istej miery nahrádza príkaz busted. Tento skript je uložený ako `/luadev/luaserver/spec/run_tests.sh` a je možné ho spustiť týmto spôsobom:

```bash
cd /luadev/luaserver
./spec/run_tests.sh
```

Treba podotknúť, že tak ako v prípade busted, aj v tomto prípade je potrebné byť nastavený v priečinku, ktorý obsahuje priečinok `spec/` s testovacími skriptami.
Rovnako ako príkaz `busted`, aj tento skript sa pozerá do priečinku `spec/` a hľadá súbory, ktoré obsahujú v názve podreťazec `_spec`. Každý takýto nájdený súbor je následne samostatne vykonaný, čím zabezpečíme, že všetky testy budú korektne spustené.

Nevýhodou tohto riešenia je neprehľadnosť výsledkov - keď po dokončení jedného súboru vypíše busted výsledky testov, následne je spustený ďalší test a v konzole sa výsledky predchádzajúcich testov stratia medzi výpismi nasledujúcich testov a na konci nie je vypísaný nijaký sumár. Ak potrebujeme spustiť konkrétny súbor s testami, urobíme to pomocou príkazu `busted spec/nazov_suboru.lua`

Problém s knižnicou `terra` sme riešili aj na oficiálnej GitHub stránke busted projektu, ale nikto z tvorcov busted-u nám nevedel poradiť, preto sme ostali pri tomto bash riešení. 

### Expose blok

Expose blok je vykonávaný sám od seba ešte pred ktorýmkoľvek `describe` blokom alebo `setup` blokom. Čo sa v ňom deje je to, že porúša pravidlo izolácie skriptov, ktoré spôsobovalo, že každý skript, ktorý sa vyžadoval v testoch cez `require` musel mať vlastný dopyt po module `core`. Takéto riešenie je však nesprávne, pretože potrebujeme, aby `core` bol vyžadovaný iba raz. Z toho dôvodu je pridaný blok `expose`, v ktorom môžeme vidieť aj inú syntax pre premenné (napr. `_G.core`).

Okrem samotného nastavovania premenných sa tu nachádza aj farebný print výpis aktuálnej "TestSuity". Tento print je pridávaný len kvôli prehľadnosti, názov suity vypisuje tmavomodrou farbou a necháva okolo seba voľné riadky, čo spôsobuje, že tester si tento riadok ihneď všimne a vie, ktorého lua súboru sa týkajú testy vykonávané po tomto výpise. V prípade potreby je možné zmeniť farby výpisov alebo úplne odstrániť tento riadok.

### Luaserver test skripty

V priečinku `/luadev/luaserver/spec/` sa nachádza zatiaľ 8 súborov - 7 test skriptov a 1 bash skript. Tu je prehľadný zoznam test skriptov:

##### diagrams_spec.lua

Testuje dve funkcie zo súboru `luaserver/src/LuaScripts/Modules/server/diagrams.lua` týkajúce sa UML diagramov. Druhý test oznamuje "chybu" v súbore `_uml.txt`, ale zrejme je to preto, lebo tento súbor neobsahuje nijaké relevantné dáta. Na chod testu to však nemá vplyv. 

##### edgeDataColumn_spec.lua

Testuje funkcie zo súboru `luaserver/src/LuaScripts/Modules/server/edgeDataColumn.lua` a tieto funkcie vykonávajú operácie nad hranami grafu, napr. zisťujú farbu hrany, zisťujú rodiča danej hrany, jej label, viditeľnosť a mnohé iné atribúty.

##### layouting_spec.lua

Skript testuje funkcie zo súboru `luaserver/src/LuaScripts/Modules/server/layouting.lua`. Tieto funkcie ovládajú chod layoutovacieho algoritmu, operácie, ktoré tento skript vykonáva, sú napríklad spustenie, pozastavenie, obnovenie alebo ukončenie layoutovania, prvotná inicializácia alebo aktualizácia uzlov. 

##### magnets_spec.lua

Tento skript má za úlohu testovať funkcie zo súboru `luaserver/src/LuaScripts/Modules/server/magnets.lua`. Medzi tieto funkcie patrí napríklad pridanie a odstránenie meta-uzlu, pridanie a odstránenie meta-hrany, nastavenie sily, ktorou magnety priťahujú uzly, nastavenie repulzívnej sily alebo minimálnu veľkosť okraja, resp. odstupu od daného uzla.

##### nodeDataColumn_spec.lua

Tento skript testuje funkcie zo súboru `luaserver/src/LuaScripts/Modules/server/nodeDataColumn.lua`. Funkcie sa týkajú operácií nad uzlami grafe, medzi ktoré patrí napríklad získanie pozície uzla, jeho farby, veľkosti, tvaru, názvu alebo viditeľnosti a ďalšie iné atribúty týkajúce sa uzlov v grafe.

##### operators_spec.lua

V tomto skripte sú otestované funkcie zo súboru `luaserver/src/LuaScripts/Modules/server/operators.lua`, majú za úlohu nastavovať uzlom a hranám tvar a farbu, pozície uzlov, ich veľkosti, prípadne zafixovanie daného uzla. 

##### serializer_spec.lua

Posledný testovací skript testuje funkcie zo súboru `luaserver/src/LuaScripts/Modules/serializer.lua`. V skripte sa testujú štandardné funkcie nad uzlami, no predovšetkým sa testuje, či serializer dokáže po vykonaní funkcie správne serializovať dané údaje a či ich pred vykonaním funkcie dokáže správne deserializovať, keďže je to potrebné na korektný chod celého Lua serveru.

### Hinty na ďalší vývoj

Ako ste si mohli všimnúť, vytvorili sme konvenciu, podľa ktorej každý súbor s lua funkciami má vlastný súbor s testami. Tento testovací súbor má rovnaký názov, akurát na konci názvu pred príponou ešte obsahuje reťazec `_spec`. Nie je to nutne potrebné, ale myslíme si, že je to takto prehľadnejšie.

Ak budú budúci testeri vytvárať nové testy k existujúcim lua súborom, stačí popridávať nové `it` bloky do `describe`-u, prípadne pridať nový `describe` do existujúceho skriptu.

Ak budú budúci testeri vytvárať testy k novým lua súborom, je vhodné v hlavičke testovacieho skriptu nazančiť, čoho sa tieto testy týkajú, pridať dátum a meno osoby, ktorá tento test robila, prípadne ďalšie informácie, ktoré tester považuje za potrebné.