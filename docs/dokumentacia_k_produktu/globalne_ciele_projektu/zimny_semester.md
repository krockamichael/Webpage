# ❄️ Zimný semester
Nakoľko sa jedná o už zabehnutý a existujúci projekt, prvotným cieľom na zimným semester bolo, dôkladne sa s ním zoznámiť. To sa nám z veľkej časti aj podarilo. Spoznali sme jeho netriviálnu architektúru, aká funkcionalita implementovaná už je a aká sa nachádza v roadmape tohto projektu.

Veľkým cieľom na zimný semester bolo, sfunkčnenie tohto projektu na platforme macOS. Tomu sa intenzívne venoval menovite člen tímu Ladislav Zemko spolu s vedúcim. Podarilo sa im pokoriť niekoľko prekážok, no napriek obrovskej vynaloženej námahe, veľa z nich ostalo ešte neprelomených. Vzhľadom na to, že tento cieľ vnímame celý tím ako pomerne kľúčový, najmä aj pre budúci vývoj, veríme, že už čoskoro sa ho podarí naplniť.

V rámci pokusov o sfunkčnenie tohto projektu na platformu macOS, bol implementovaný modul Luapower, ktorý sa zatiaľ používa iba na tejto platforme. Na platformu Windows ho žiaľ z dôvodu dočasných problémov na strane tvorcov tohto modulu, nie je možné pridať.

Ďalším z cieľov, ktoré sa podarilo pomerne rýchlo naplniť, bolo automatické testovanie LuaRocks repozitárov. Táto funkcionalita bola pomerne malá, no za to veľmi potrebná pre niektorých bakalárskych študentov. Bol teda vytvorený skript, ktorý spustí funkcionalitu modulu LuaDb nad všetkými existujúcimi LuaRocks balíkmi.

Conitinuous integration bol cieľ sám o sebe. Bolo tu množstvo úloh, ktoré bolo treba implementovať. Podarilo sa optimalizovať CI pre modul LuaInterface a taktiež bolo vytvorené CI pre nasadzovanie webovej stránky tohto projektu a tiež pre generovanie dokumentácie.

Ďalšou funkcionalitou, ktorá bola naplánovaná bolo vylepšenie interakcie s grafom a teda implementácia ovládacích prvkov akými sú magnety alebo obmedzovače. Obmedzovače v systéme s veľkej časti implementované už sú, no bolo by potrebné ich dokončiť a vyladiť. V rámci tejto funkcionality bola uskutočnená analýza aktuálneho stavu. Tento cieľ sa pravdepodobne prenesie na neskoršie obdobie, nakoľko zatiaľ nie je veľkou prioritou. Funkcionalita magnetov bola taktiež zanalyzovaná, no narozdiel od obmedzovačov, tu bolo doteraz implementované zatiaľ veľmi málo. Preto sme sa tejto funkcionalite začali venovať a zopár úloh bolo aj dokončených. Zbytok sa však pravdepodobne prenesie do nasledujúceho semestra.

Nakoľko bol tento projekt pre vývojový tím nový, cieľe boli na začiatku semestra stanovené viacmenej nepriamo. Na konci semestra môžeme však zhodnotiť, že bolo implementované primerané množstvo rôznorodej funkcionality, čo naplnilo očakávania.
