# Úvod
Testy sú napísané v C# a C++.
Repozitáre 3dsoftvis_remake, LuaGraph a LuaInterface majú plne vybudovanú CI infraštruktúru. Táto infraštruktúra sa stará o to, aby sme vyvíjaný projekt mali vždy vo funkčnom stave a vždy bol pripravený na dodanie zákazníkovi. Infraštruktúra sa stará o build projektu a všetkých jeho variant, púšťaním automatizovaných jednotkových testov, inštrumentálnych testov, analyzovaním pokrytia kódu testami a zverejňovaním ich výsledkov na GitLabe a na stránke tímového projektu vo forme artefaktov. Taktiež analyzuje zdrojový kód a jeho kvalitu pomocou Lintu a ohlasuje možné sémantické problémy. Tiež sa stará o generovanie dokumentácie zo zdrojových kódov pomocou Doxygenu. Všetky vygenerované artefakty sú prístupné na webovej stránke tímu [http://team07-18.studenti.fiit.stuba.sk/ci-artifacts/](http://team07-18.studenti.fiit.stuba.sk/ci-artifacts/).

### QA úroveň
Táto úroveň vykonáva testovanie a udržiavanie kvality a zabránenie regresii, teda aby po zmene kódu naďalej správne fungoval.

 `run_tests` - Táto úloha testuje C# moduly

 `run_lua_tests` - Táto úloha testuje Lua moduly

### CMAKE

BUILD_SOFTVIZ_MODULES_TESTS

- Ak je hodnota `TRUE`, do buildu sa zahrnie build testov pre softviz moduly
- Predvolená hodnota: `FALSE`
- Výstupný adresár: `./_install/SoftvizModules.Tests/` Testy pre Softviz moduly

### 3DSoftviz/
- `CSProjects/` - Softviz moduly (C#) spolu so svojimi testami, tie sú automaticky pribalené do unity projektu a obsahujú celú logiku
- `./Assets/`
- `UnityTests` - Testy pre Unity projekt

#### Všeobecná adresarová štruktúra repozitára
- `Project/`
    - `./_install/` - obsahuje buildnuté artefakty
        * `Softviz/` - Plne funkčný softviz projekt
        * `SoftvizModules/` - Moduly pre Softviz projekt
        * `SoftvizModules.Tests/` - Testy pre Softviz moduly
    - `./cmake/` - Obsahuje cmake moduly
    - `./Documentation/` - Dokumentácia k projektu
    - `./Projects/` - Obsahuje jednotlivé projekty Softvizu
        * `LuaDependencies/` - Lua knižnice, ktoré sú pridané do repozitára ako git submoduly
        * `3DSoftviz/`
            - `CSProjects/` - Softviz moduly (C#) spolu so svojimi testami,
              tie sú automaticky pribalené do unity projektu a obsahujú celú logiku
            - `UnityProject/` - Unity projekt pre Softviz, slúži iba ako
              vizualizačná vrstva. Všetka ostatná logika patrí do Softviz modulov
    - `./resources/` - Dodatočné súbory k projektom (spoločné scripty, obrázky, ...)

#### Adresarová štruktúra pre Unity projekt
- `./Assets/`
    * `Animations` - Skripty pre animácie
    * `Editor` - Skripty pre Unity Editor
    * `External` - Externé assety z Assets Store
    * `Plugins` - Externé knižnice
        - `ExternalModule` - Externé C# moduly, napr. Softviz moduly
        - `Lua` - Natívne (C, C++) knižnice pre prácu s Lua
    * `Resources` - Zdroje pre Unity - `Prefabs`, `Textures`, `Materials`, `Fonts`, ...
    * `Scenes` - Unity scény
    * `Scripts` - Skripty pre Unity objekty,
    * `StreamingAssets` - Assety, ktoré nie sú pri builde pribalené do projektu, ale iba prekopírované k projektu
        - `LuaScripts` - Všetky lua scripty, ktoré by malo byt možné dynamicky meniť aj po skompilovaní unity projektu
    * `UnityTests` - Testy pre Unity projekt
- `./ProjectSetting`
