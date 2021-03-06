# 📊 UML diagramy

# Motivácia
Používateľ programu by mal mať možnosť zobraziť si rôzne metriky a UML diagramy analyzovaného kódu. Dva základné diagramy, ktoré chceme generovať sú Class diagram a Sequence diagram.

# Návod na použitie
1. načítame graf moonscript projektu ([návod](../prirucky/pouzivatelska_prirucka/moonscript_projekty.md))
2. myšou označíme triedu (červená) alebo metódu (zelená)
4. stlačíme klávesu 5

# Technická dokumentácia
V aktuálnom stave je možné generovať Class diagram a Sequence diagram pre Moonscript kódy. Implementácia je realizovaná v module `luameg` a v lua časti 3D Softvizu (`luaserver\src\LuaScripts\Modules\server\diagrams.lua` a `luaserver\src\LuaScripts\Modules\softviz\graph_handler.lua`).

## Luameg
Modul `luameg.plantuml` exportuje príslušné funkcie pre generovanie Class a Sequence diagramov buď v plantuml txt alebo priamo svg. Pri generovaní rekurzívne prehľadáva graf od zvoleného uzla a generuje plantuml textový súbor. Následne je spustený `plantuml.jar` s týmto textovým súborom na vstupe a vygeneruje svg súbor. Obsah svg súboru je načítaný do premennej, súbory odstránené a hodota navrátená.

Pre zobrazenie grafu sú generované uzly `method_sequenceDiagram` a `class_ClassDiagram`. Tieto uzly slúžia pre layoutovanie, aby boli vhodne umiestnené v priestore.

## Lua časť 3DSoftVizu
V `luaserver\src\LuaScripts\Modules\server\diagrams.lua` sú dve funkcie pre generovanie Class a Sequence diagramov. Ako argument majú id grafu a id uzla. Ak je tento uzol typu `method_sequenceDiagram` alebo `class_ClassDiagram`, vyhľadá sa k nim prislúchajúci `class`/`method` uzol. Nasleduje volanie rovnomennej funkcie v `graph_handler`-i, v ktorom je referencia na graf.

## Unity
<font color="red">Neimplementované / netestované</font></br>
Unity obsahuje webový prehliadač `ZFBrowser`, v ktorom sa UML diagramy zobrazujú. Hlavná trieda, ktorá obsluhuje tento prehliadač je `BrowsersManager`, ktorá vyhľadáva vyššie spomínané layoutovacie uzly a pre ňe inštanciuje príslušné prehliadače. Prehliadače sú spočiatku skryté, zobrazia sa po označení príslušneho uzla a stlačení číselnej klávesy 1 až 5, pre UML diagramy to je práve klávesa 5.

Každý typ prehliadača má svoj 'skript', ktorý obsluhuje svoju inštanciu `ZFBrowser`-a a prefabu. `UmlBrowserScript` pri aktivácii (zobrazení) prehliadača spustí funkciu generovania diagramu v svg formáte a string posunie do prehliadača.


## Súvisiace súbory
- <font color="red">?</font>`UnityProject/Assets/Scripts/Browser/UmlBrowserScript.cs`
- <font color="red">?</font>`UnityProject/Assets/Scripts/Browser/BrowsersManager.cs`
- <font color="red">?</font>`UnityProject/BrowserAssets/`
- `luaserver\src\LuaScripts\Modules\server\diagrams.lua`
- `luaserver\src\LuaScripts\Modules\softviz\graph_handler.lua`
