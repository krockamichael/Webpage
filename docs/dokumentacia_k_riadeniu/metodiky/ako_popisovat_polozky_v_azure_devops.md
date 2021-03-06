# Ako popisovať položky v Azure DevOps

#### BUG

1. TITLE
    - Názov bug reportu musí byť stručný a jasný (pointa problému musí byť
      obsiahnutá v čo najmenej slovách a nesmie obsahovať iné než kľúčové
      informácie pre uvedenie čitateľa do kontextu)

2. REPRO STEPS
    - Celý názov - steps to reproduce
    - Musí obsahovať kroky, ktoré je nutné vykonať, aby bolo možné bug zreprodukovať
    - Kroky musia byť napísané v poradí, v ktorom musia byť vykonané
    - Kroky musia obsahovať do detailu úplne všetky informácie, ktoré sú potrebné
      k tomu, aby bolo možné problém zreprodukovať (ak sa vám javí nejaká informácia
      ako samozrejmosť, napriek tomu ju uveďte - nikdy neviete,
      aké sú vedomosti osoby, ktorá bude s vaším bug reportom pracovať)

3. SYSTEM INFO
    - Informácie o softvéri a konfigurácii systému, ktoré sú relevantné pre uskutočnenie testu.

4. ACCEPTANCE CRITERIA
    - Poskytnite kritériá, ktoré je potrebné splniť skôr, ako bude možné chybu alebo príbeh používateľa uzavrieť.
    - Pred začiatkom prác opíšte čo najjasnejšie akceptačné kritéria zákazníka.
    - Akceptačné kritériá sa môžu použiť ako základ pre akceptačné testy,
      aby ste mohli efektívnejšie vyhodnotiť, či bola položka uspokojivo dokončená.

5. FOUND IN BUILD
    - Keď správca testov vytvorí chyby, automaticky vyplní *System info*
      a *found in build* informáciami o softvérovom prostredí a o tom, kde sa chyba
      vyskytla. Pre viac informácií o definovaní softvérových prostredí, navštívte stránku:
      [https://docs.microsoft.com/en-us/azure/devops/test/test-different-configurations?view=azure-devops](https://docs.microsoft.com/en-us/azure/devops/test/test-different-configurations?view=azure-devops)

6. INTEGRATED IN BUILD
    - Keď vyriešite chybu, použite Integrated in Build na označenie názvu buildu,
      ktorý obsahuje kód, ktorý opravuje chybu.

7. PRIORITY
    - Subjektívne hodnotenie chyby, pretože sa týka podnikania alebo požiadaviek zákazníka.
      Priorita označuje poradie, v ktorom by sa mali opraviť chyby kódu.

    - !!! tip "Akceptované hodnoty"
        - **1**: Produkt sa nedá odoslať bez úspešného vyriešenia pracovného predmetu a mal by sa riešiť čo najskôr.
        - **2**: Produkt sa nedá odoslať bez úspešného vyriešenia predmetu práce, nemusí sa však okamžite riešiť.
        - **3**: Vyriešenie pracovnej položky je voliteľné na základe zdrojov, času a rizika.

8. SEVERITY
    - Subjektívne hodnotenie vplyvu chyby na projekt alebo softvérový systém.
      Napríklad: Ak kliknutie na vzdialený odkaz (zriedkavá udalosť) spôsobí
      zlyhanie aplikácie alebo webovej stránky (závažná skúsenosť so zákazníkom),
      môžete určiť Závažnosť = 2 (vysoká) a Priorita = 3.

    - !!! tip "Akceptované hodnoty"
        - **1 - Kritická**:  Musí sa opraviť. Porucha, ktorá spôsobuje ukončenie
          jedného alebo viacerých komponentov systému alebo celého systému alebo
          spôsobuje rozsiahle poškodenie údajov. Neexistujú žiadne prijateľné
          alternatívne metódy na dosiahnutie požadovaných výsledkov.
        - **2 - Vysoká**: Zvážte opravu. Porucha, ktorá spôsobuje ukončenie jedného
          alebo viacerých komponentov systému alebo celého systému alebo spôsobuje
          rozsiahle poškodenie údajov. Existuje však prijateľná alternatívna metóda
          na dosiahnutie požadovaných výsledkov.
        - **3 - Stredná**: Porucha, ktorá spôsobuje, že systém poskytuje nesprávne,
          neúplné alebo nekonzistentné výsledky.
        - **4 - Nízka**: Menší alebo kozmetický defekt, ktorý má prijateľné
          riešenie na dosiahnutie požadovaných výsledkov.

#### EPIC

1. DESCRIPTION
    - Jasne a podrobne popíšte cieľ epicu.

2. ACCEPTANCE CRITERIA
    - Jasne definovať, kedy je epic hotový a všetko funguje presne tak, ako to bolo na začiatku definované.

3. STATUS
    - **start date** : Dátum začiatku práce na epicu
    - **target date** : Dátum, do ktorého sa má epic implementovať.

4. PRIORITY

    - Subjektívne hodnotenie
    - Výber zo štyroch hodnôt podľa priority - **1 (najvyššia)**  až **4 (najnižšia)**

5. EFFORT

    - Poskytnite relatívny odhad množstva práce potrebnej na dokončenie epicu.
      Použite akúkoľvek číselnú jednotku merania, na ktorej ste sa s tímom dohodli.

6. BUSINESS VALUE

    - Zadajte prioritu, ktorá zachytáva relatívnu hodnotu epicu v porovnaní
      s ostatnými položkami rovnakého typu. Čím vyššie číslo, tým vyššia je hodnota podniku.
    - Toto pole použite, ak chcete zachytiť prioritu osobitne od meniteľného
      poradia nevybavených položiek backlogu.

7. TIME CRITICALITY

    - Subjektívna merná jednotka, ktorá zachytáva, ako sa biznis hodnota epicu
      v priebehu času znižuje. Vyššie hodnoty znamenajú, že epic je zo svojej
      podstaty časovokritickejší ako položky s nižšími hodnotami.

8. VALUE AREA

    - Oblasť hodnoty pre zákazníka určená epicom.

    - !!! tip "Zahrnuté hodnoty"
        - **Architectural** : technické služby na implementáciu obchodných funkcií, ktoré poskytujú riešenie
        - **Business** : služby, ktoré napĺňajú potreby zákazníkov alebo zainteresovaných
          strán a ktoré priamo prinášajú hodnotu pre zákazníka na podporu podnikania

#### FEATURE

- Rovnaká štruktúra a pravidlá ako pri epicu (Viď popis epicu).

#### IMPEDIMENT

  - Impedimenty (prekážky) predstavujú neplánované činnosti. Ich riešenie si
    vyžaduje viac práce nad rámec toho, čo sa sleduje podľa skutočných požiadaviek.
  - Použitie typu pracovnej položky impediment vám pomáha sledovať
    a spravovať tieto problémy, až kým ich nevyriešite a nezatvoríte.
  - Impedimenty sa nezobrazujú v backlogu. Namiesto toho je možné
    ich sledovať použitím [dopytov](https://docs.microsoft.com/en-us/azure/devops/boards/queries/using-queries?view=azure-devops).

    1. DESCRIPTION
        - Jasne a podrobne popíšte prekážku.

    2. RESOLUTION
        - Jasne definovať okolnosti, za akých môže byť daná prekážka považovaná za plne vyriešenú.

    3. PRIORITY
        - Subjektívne hodnotenie
        - Výber zo štyroch hodnôt podľa priority - **1 (najvyššia)**  až **4 (najnižšia)**

#### PRODUCT BACKLOG ITEM

- Rovnaká štruktúra a pravidlá ako pri epicu (Viď popis epicu).

#### TASK

- Do backlogu pridávate tasky (úlohy), keď chcete sledovať prácu potrebnú
  na ich implementáciu a odhadnúť prácu priradenú jednotlivým členom tímu a tímu ako celku.
- Ak chcete porovnať kapacitu so skutočne plánovanou prácou,
  musíte pre každú nevybavenú položku definovať a odhadnúť tasky.

    1. DESCRIPTION
        - Jasne a podrobne popíšte úlohu.

    2. PRIORITY
        - Subjektívne hodnotenie
        - Výber zo štyroch hodnôt podľa priority - **1 (najvyššia)**  až **4 (najnižšia)**

    3. REMAINING WORK
        - Množstvo zostávajúcej práce na dokončenie úlohy.
          Postupom práce aktualizujte toto pole. Používa sa na výpočet kapacitných
          diagramov a grafu burzového šprintu. Môžete určiť prácu v akejkoľvek
          meracej jednotke, ktorú si tím vyberie.

    4. BLOCKED
        - V nastavení scrum alebo agile je „blokovaný“ stav pracovnej položky,
          ktorú nemôžete dokončiť z dôvodu vonkajších faktorov.
          Napríklad nemôžete pridať funkciu, pretože čakáte, až váš spolupracovník
          dokončí pull request, na ktorý nadväzuje vaša práca.
        - položku môžete označiť ako blokovanú výberom možnosti **Yes**

#### TEST CASE

- Vytvorte manuálne testovacie prípady a skontrolujte, či každý z výstupov vyhovuje potrebám vašich používateľov.
- Usporiadajte svoje testovacie prípady tak, že ich pridáte do testovacích plánov a testovacích súborov.
- Vyberte pre danú úlohu testerov.
- Nový krok môžete pridať zvolením možnosti **Click or type here to add a step**
- Pre každý krok zadáte:
    1. ACTION
        - Presný popis akcie, ktorú má tester vykonať
    2. EXPECTED RESULT
        - Presný popis výsledku, ktorý by sa mal udiať za predpokladu, že všetko funguje, ako má

Pre všetky položky, pri ktorých je táto možnosť dostupná, je potrebné priradiť nadradenú položku (parent).
