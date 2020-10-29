# ☀️ Letný semester

Po zimnom semestri sa nám vykryštalizovalo, v čom sú jednotliví členovia tímu dobrí,
a čo na tomto projekte radi robia. To, aby jednotliví členovia tímu robili na tom, čo ich baví,
sme vnímali ako kľúčové pre plynulé fungovanie tímu a pre celkovú efektivitu a postup prác na projekte.

V zimnom semestri sme si dali za cieľ sfunkčniť projekt 3DSoftViz na platforme macOS. Tento cieľ sa nám
za celý semester nepodarilo splniť, preto sme ho posunuli v rámci priorít na posledné miesto a teda
sme sa tejto problematike už ďalej nevenovali.

Prvotným cieľom bola podrobná analýza toho ako vzniká graf na jednotlivých vrstvách.
Analýza bola teda spísaná pre Unity časť, LuaDb a LuaMetrics a tiež Lua kódy integrované vrámci
Unity. Výsledky boli vložené do dokumentácie k produktu.

Hlavným cieľom pre Unity časť, bola implementácia funkcionality magnetov, ktorej sme sa
začali venovať už v zimnom semestri. Postupne bolo implementovaných niekoľko naplánovaných úloh
zo zimného semestra. Konkrétne boli implementované dva typy magnetov, s ktorými je možné
interagovať niekoľkými spôsobmi, ako naprílad ich presúvať, spájať s uzlami, nastavovať veľkosť
magnetického pola, označovať ich, odstraňovať alebo skrývať. Napriek tomu, že spomínaná
funkcionalita je implementovaná zatiaľ iba pre Desktop scénu, vnímame to za úspech, nakoľko je
možné túto funkcionalitu do budúcna pomerne jednoducho rozšíriť aj na VR alebo AR scénu.

Ďalším z hlavných cieľov pre letný semester, bolo generovanie UML diagramov z grafu a jeho
jednotlivých uzlov, priamo v programe 3DSoftViz. Potrebné bolo využiť nástroj PlantUML, ktorý
dokáže tieto diagramy generovať. Následné výstupy bolo potrebné zobrazovať v integrovaných
prehliadačoch, ktoré sa zobrazujú vedľa grafu. Túto funkcionalitu môžeme považovať za viac-menej
hotovú, až na pár drobných chýb spôsobených samotným nástrojom PlantUML. To vnímame ako veľký
úspech.

Pokračovali sme vylepšením testov pre jednotlivé Lua repozitáre. Podarilo sa nám vylepšiť
Busted testy v moduloch LuaGit, LuaMetrics, LuaMeg a taktiež vylepšiť test coverage. Ďalej boli
implementované komplexnejšie testy v module LuaMetrics. Tiež boli implementované ďalšie testy
do modulov LuaDb, LuaMetrics, LuaMeg a LuaGit pričom boli upravované aj jednotlivé CI image.

Menším cieľom bolo vyskúsať, či je možné v nástroji 3DSoftViz načítať nielen Lua
projekty, ale aj projekty v jazyku Moonscript. Táto funkcionalita bola odskúšaná a bol spísaný
report do dokumentácie, ako niečo podobné zreprodukovať.

Jedným z výskumných cieľov bolo nájsť vhodné IDE na prácu s Lua projektami. Na tejto úlohe sa
podieľalo niekoľko členov tímu a spoločnými silami identifikovali ZeroBrane studio ako
najvhodnejší nástroj. Bol spísaný výstup, ktorý pomôže budúcim programátorom správne si
toto IDE nastaviť a používať ho, čo im uľahčí prácu s projektami v jazyku Lua.

Ďalším cieľom, podobne ako v zimnom semestri, bolo vylepšenie infraštruktúry projektu. Tu bolo
dokončených niekoľko dôležitých úloh ako napríklad pridanie logovania do jednotlivých Lua
modulov, vylepšenie a úprava niektorých CI image-ov, modifikácia CMakeLists niektorých Lua
modulov a mnoho ďalších úloh. Opäť sú to významné úlohy z hľadiska celkového vylepšenia
projektu.

V rámci tohto semestra sme sa tiež chceli chvíľu povenovať udržiavateľnosti kódu. V rámci
niektorých Lua modulov bolo vykonaných niekoľko úprav, ako napríklad odstránenie zbytočných
prázdnych riadkov, eliminovanie warningov a podobne, čo sa môžu javiť ako maličkosti, no opäť
to veľmi prispelo k celkovej kvalite kódu a jeho prehľadnosti.

Na začiatku letného semestra ciele neboli definované priamo. Vznikali a vynárali sa v priebehu semestra a z našej strany sme pomerne spokojní s tým, ako sa nám ich darilo plniť. Každý člen tímu svojim úsilím prispel k nejednému cieľu, čo sa tiež javí ako úspešná tímová spolupráca.
