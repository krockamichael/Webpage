# Ako písať dokumentáciu

Dokumentáciu píšeme v markdowne na gitlabe v repozitári Dokumentácia <https://gitlab.com/FIIT/3DSoftVis_Remake/documentation>.

Celá dokumentácia sa delí na dve časti:

1. **Dokumentácia k produktu** - zachytáva architektúru celého systému, opisuje jeho funkcionalitu a obsahuje tiež dokumentáciu zo zdrojových kódov
2. **Dokumentácia k riadeniu** - dokumentuje procesy riadenia v projekte a jednotlivé metodiky

Vygenerovaná dokumentácia sa nachádza na našej stránke <https://team03-20.studenti.fiit.stuba.sk/home.html>.

## Dokumentácia k produktu

 1. Architektúra systému

    Táto časť dokumentácie obsahuje ucelený pohľad na systém zhora. Zachytáva jednotlivé moduly systému ich prepojenie.
    Opisuje tiež funkcionalitu modulov.
    Pre túto časť je zvlásť vhodné použitie diagramov na lepšie zachytenie architektúry systému.

    *Táto časť dokumentácie by tiež mala zachytávať komunikáciu medzi jednotlivými modulmi (najlepšie formou diagramu).
    Túto časť je potrebné ešte len doplniť.*

 2. Infraštruktúra

    Časť o infraštruktúre slúži na opis všetkých podporných nástrojov pre správu a nasadenie systému.
    Obsahuje tri základné časti: build systému, CI/CD a testy.

    - Build systém popisuje spôsob buildovania pre moduly v projekte.
    - Časť Gitlab CI/CD obsahuje použité pipelines. Pre každý modul je potrebné popísať, aké etapy pipeline obsahuje, na
     čo slúžia a aké artefakty produkujú.
    - Dokumentácia k testom obsahuje základné informácie pre písanie a používanie testov. Má opisovať aké typy testov sú v projekte
     použité, ako ich spustiť a kedy je vhodné ich použiť. Každý test case by mal obsahovať krátky popis, na čo slúži. Tento popis
     sa píše priamo do zdrojových kódov.

 3. Funkcionalita systému

    Táto časť sa nepozerá na systém z pohľadu architektúry ale z pohľadu funkcionality. Táto časť pritom neslúži ako príručka
    pre používateľa, je to skôr návod pre vývojára. Jeho úlohou je poskytnúť informáciu o nejakej črte alebo funkcionalite z rôznych pohľadov.
    Ako prvé je potrebné vysvetliť účel funkcionality. Je potrebné ju tiež zachytiť z pohľadu architektúry, ktoré časti sú pre jej vykonanie
    potrebné a ako spolu komunikujú. Je vhodné popísať aj niektoré podstatné funkcie alebo pridať odkaz na testy. Na záver by mal nasledovať
    popis funkcionality z pohľadu používateľa, môže obsahovať aj odkaz na príslušnú časť v používateľskej príručke.

    Predloha pre písanie dokumentácie k funkcionalite systému:  

    - predloha sa nachádza v priečinku `Sablony.exclude`

``` markdown
# Názov modulu

Popis modulu (high level pohľad, na čo modul slúži, aká je jeho funkcionalita, a pod.)

## Architektúra

Zachytáva časti systému a triedy, v ktorých je daná funkcionalita implementovaná.
Je potrebné opísať aké moduly a časti meddzi sebou komunikujú.
Môžu byť použité tiež diagramy komunikácie ak je to vhodné. Pri niektorých funkcionalitách
je možné pridať aj stavový diagram a popísať jednotlivé stavy.

## Technická dokumentácia

Vysvetľuje použitú implementáciu. Môže obsahovať zoznam použitých tried a funkcií.
Podstatné funkcie alebo metódy je vhodné bližšie popísať.

## Testy

Aké máme pre tento modul testy, aké je pokrytie kódu testami.
Je dobré pridať odkaz na testy.

## Používateľská príručka

Stručný popis použitia funkcionality z pohľadu používateľa.
Je vhodné použiť odkaz na príslušnú časť používateľskej príručky.

```

 4. Príručky

    Pod časť dokumentácie príručky spadajú všetky návody a postupy, s ktorými sa môžeme pri vývoji alebo
    alebo používaní systému stretnúť. Príručky sú rozdelené na tri časti a inštalačnú, vývojársku a používateľskú.

    Každá príručka by mala obsahovať jasný a podrobný postup ako sa dostať k cieľu. Mala by tiež vysvetľovať menej zrejmé kroky,
    prečo ich treba vykonať. Pri písaní príručiek je dôležité pamätať na to, že čo sa teraz môže zdať jasné a samozrejmé,
    nemusí také byť aj v budúcnosti alebo pre niekoho menej skúseného.

 5. Dokumentácia k zdrojovému kódu

    Táto časť obsahuje vygenerovanú dokumentáciu zo zdrojových kódov. Generuje sa pomocou [Gitlab CI](https://gitlab.com/FIIT/Common/Lua/luametrics/-/blob/develop/.gitlab-ci.yml), pre každý modul a vetvu zvlášť.

    Pri komentovaní kódu je potrebné dodržať nasledujúce pravidlá.

    **modul/package/namespace**
      - popis na čo slúži
      - API, zoznam verejných funkcií, ktoré poskytuje aj so stručným popisom
      - zoznam interných funkcií aj so stručným popisom
      - zoznam tried, ktoré obsahuje aj so stručným popisom *(Poznámka: v jazyku Lua triedy neexistujú, my sa však v projekte
        tvárime, že áno. Využívame na to funcie vracajúce objekt.)*

    **trieda**

      - popis čo robí a na čo slúži
      - zoznam atribútov
      - zoznam metód
      - popis jednotlivých atribútov, ich účel
      - popis jednotlivých metód, čo robia

        - parametre metódy + stručný opis
        - návratová hodnota metódy + stručný opis
        - vo vnútri metódy je vhodné pridať komentár ku každej ucelenej časti kódu, aby bolo možné rýchlo
          zistiť, čo funkcia alebo metóda interne robí

    [Dobre zdokumentovaná ukážka package-u v jazyku Lua.](https://github.com/LuaDist/luadist/blob/master/dist/package.lua)

    Vhodná na inšpiráciu je tiež dokumentácia Qt, ktorú najdete [tu](https://doc.qt.io/qt-5/).

    Pomocné dokumenty pri písaní kódu:
    1. [Konvencie písania kódu](konvencie.md)
    2. [Ako logovať z kódu](ako_logovat_z_kodu.md)

 6. Časté problémy

    Časť časté problémy obsahuje často sa vyskytujúce problémy pri vývoji systému. Tieto problémy sa môžu týkať rôznych
    oblastí. Podstatné je zapísať ku každému problému spôsob alebo postup jeho odstránenia. Táto časť slúži na predchádzanie
    riešenia tých istých problémov zas a znova.

**Pri vkladaní ukážok kódu do dokumentácie je nutné, pokiaľ je to možné, vkladať ich dynamicky a to pomocou makra code_snippets, ktoré je popísané
v časti [MkDocs](../../dokumentacia_k_produktu/infrastruktura/podporne_nastroje/mkdocs.md).**

Pre každú novú časť dokumentácie je vždy potrebné napísať úvod, ktorý podá čitateľovi základné vysvetlenie konceptu alebo
funkcionality, ktorej opis bude nasledovať.

Riadky by mali byť maximálne 80-120 znakov dlhé, aby sa ľahšie hľadali zmeny v Gite.

Užitočné tipy a triky môžete nájsť na <https://www.mkdocs.org>.
