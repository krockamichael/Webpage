# 3DSoftVis_Remake
Pipeline v repozitári 3dsoftvis_remake sa skladá z viacerých úrovní, pričom každá úroveň má na starosti inú časť procesu nasadenia systému. Pipeline sa z dôvodu šetrenia prostriedkov spúšta len pre vetvy s vytvoreným merge requestom.

## Premenné
Súbor `gitlab-ci.yml` obsahuje viacero preddefinovaných premenných (príklad: CI_PROJECT_DIR).

## `before_script`
- nastavenie ciest k jednotlivým priečinkom projektu podľa obsahu do premenných. Premenné - `SOFTVIZ_ROOT`, `SOFTVIZ_MODULES`, `SOFTVIZ_UNITY`, `BUILD_DIR`, `INSTALL_DIR`
- vytvorenie súboru, ktorý obsahuje licenčný kľúč pre Unity.
- nastavenie SSH - kontrola, či je SSH nainštalované. Ak sa želaný súbor nenájde, prebehne inštalácia s automatickou odpoveďou "áno" na interakcie, ktoré
počas inštalácie vyskočia. Nasleduje spustenie ssh-agent session, pridanie SSH kľúča agentovi, vytvorenie SSH priečinku so správnymi povoleniami (read, write aj execute)
a zozbieranie verejných SSH kľúčov.
- konfigurácia cache pamäte pre kompilátor (kvôli urýchleniu rekompilácií)
- naklonovanie projektu

## Etapy

### `build` stage
Táto úroveň vykonáva základný build samostatných modulov, ktoré nie sú závislé na
prezentačnej vrstve Unity.

### `build_modules` stage
Stará sa o buildovanie C# modulov.

`build_unity_player`
Táto úroveň vykonáva build Unity playeru (spustiteľnú binárku), vytvorené Unity moduly a
použité knižnice Leap Motion, Zed Camera, HoverUI a ZF Browser.

`build_unity_windows`
Builduje unity player pre platformu Windows. Táto úloha je povinná.

`build_unity_linux`
Builduje unity player pre platformu Linux. Táto úloha je volitelná.

`build_unity_mac`
Builduje unity player pre platformu Mac OS. Táto úloha je volitelná.

### `QA` stage
Táto úroveň vykonáva testovanie a udržiavanie kvality a zabránenie regresii.

`run_tests`
Táto úloha testuje C# moduly.

`run_lua_tests`
Táto úloha testuje Lua moduly.

### `docs` stage
Táto úroveň vykonáva generovanie dokumentácie

`make_doxygen`
Úloha generuje dokumentáciu pomocou nástroju Doxygen pre C# moduly a Unity moduly.

`extract code snippets`
Úloha generuje code snippety pomocou [doc-extra/snippet-extract.py](gitlab_images/doc_extra.md)

## Artefakty
`_install` - tento priečinok obsahuje všetky súbory, ktoré vznikli počas buildu pre platformy Windows, Mac Linux.

`TestResult.xml` - priečinok obsahujúci súbory potrebné pre reprezentáciu výsledkov testov vo formáte jednoduchej webstránky.

`3dsoftviz-techdoc` - priečinok obsahujúci dokumentáciu vygenerovanú vo formáte html.

### `deploy_docs` stage
Úlohou úrovne je export automatickej dokumentácie zdrojového kódu na vzdialený server zhromažďujúci všetku dokumentáciu - high-level aj low-level.

`deploy_doxygen`
Úloha exportuje prostredníctvom programu `rsync` vygenerovanú Doxygen dokumentáciu úrovne `docs` - priečinok `3dsoftviz-techdoc` - v HTML formáte na vzdialený server.
