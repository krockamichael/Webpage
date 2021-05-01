# LuaDB

Logika priamo súvisejúca s tvorbou grafu je rozdelená v súboroch nachádzajúcich sa v dvoch priečinkoch a to _src/luadb/extraction/\*_ a _src/luadb/hypergraph/\*_. Samotné hrany, uzly, ich výskyty a graf sú definované v jednlotlivých .lua súboroch v priečinku _src/luadb/hypergraph/_ , ktoré nesú rovnaké názvy ako ako to, čo definujú. (tj. edge, node, incidence a graph) Sú v nich definované nielen samotné objekty a ich konštruktory, ale i základné operácie priamo súvisejúce s nimi, ako napríklad funkcie na pridanie hrán, uzlov a podobne. Napríklad kód nižšie je možné zavolať nad hranou a funkcia vracia informáciu o tom, či ide o orientovanú hranu.
``` lua
function pEdge:isOriented()
  return self.orientation and self.orientation == "Oriented" and true or false;
end
```
Okrem toho obsahujú funkcie aj na vyhľadanie daných objektov podľa zadaného argumentu, ktorým sú napríklad meno alebo typ. Väčšina takýchto funkcií sa nachádza v súbore _graph.lua_. Napríklad funkcia nižšie zavolaná nad určitým grafom s argumentom *typ* vráti všetky uzly v danom grafe daného typu. 

``` lua hl_lines="5 9"
 -- get all nodes with selected type
function pGraph:findNodesByType(type)
  local occurrences = {}
  for i,node in pairs(self.nodes) do
    if node.meta.type and (node.meta.type == type) then
      table.insert(occurrences, node)
    end
  end
  return occurrences
end

```
V priečinku _src/luadb/extraction_ sa extrahuje graf z lua súborov a to následovne.

1. Najskôr je nutné získať lua súbory zo zadanej cesty. Táto funkcionalita sa nachádza v súbore _luadb/extraction/filestree/extractor.lua_. 

    1. Najskôr sa načíta cesta, skontroluje sa, či je daná cesta string a z nej sa následne vystrihne posledná časť - meno priečinku.
    2. Ak ide o úplne prvé volanie funkcie, vytvorý sa root uzol.
    3. V ďalšej funkcii sa cyklom rekurzívne prehľadávajú súbory daného priečinka, pričom ak súbor v priečinku je priečinok, tak sa do množiny lua-uzlov v grafe pridá uzol typu priečinok (directory) a prehľadávanie sa posúva hlbšie
    4. Ak súbor nebol priečinok tak sa ešte overí, či ide o _.lua_ súbor a ak áno pridá sa do množiny lua-uzlov v grafe s typom súbor (file).
    5. Ako posledné sa vytvorí hrana medzi súborom a jeho rodičom. Pri prvoúrovňovom volaní je to novovytvorený root, čiže rodičovký repozitár. V prípade, že už bola zavolaná funkcia rekurzívne, ako argument jej bol poslaný aktuálne iterovaný uzol (súbor), tak je hrane priradený ako rodič repozitár s ktorým bola funkcia volaná. 
    6. V poslednom kroku sa do grafu pridá uzol a jeho hrana.

``` lua hl_lines="3 4 13 22 27 33 37 38 39 40 41 43 44"
local function extractFilesTree(graph, path, parent)
  -- root node
  if not parent then
    local newNode = hypergraph.node.new()
    newNode.data.name = getNameFromPath(path, "/")
    newNode.data.path = path
    newNode.meta = newNode.meta or {}
    newNode.meta.type = "directory"
    graph:addNode(newNode)
    parent = newNode
  end

  for file in lfs.dir(path) do
    if file ~= "." and file ~= ".." and not utils.isHidden(file) then
      local fullPath = path..'/'..file
      local attr = lfs.attributes (fullPath)
      assert (type(attr) == "table")
      
      -- new node
      local newNode = hypergraph.node.new()
      newNode.meta = newNode.meta or {}
      if attr.mode == "directory" then
        newNode.data.name = file
        newNode.data.path = fullPath
        newNode.meta.type = "directory"
        -- recursive call
        extractFilesTree(graph, fullPath, newNode)
      else
        newNode.data.name = file
        newNode.data.path = fullPath
        newNode.meta.type = "file"
        graph.luaFileNodes = graph.luaFileNodes or {}
        if utils.isLuaFile(file) then table.insert(graph.luaFileNodes,newNode) end
      end
      
      -- new edge
      local newEdge = hypergraph.edge.new()
      newEdge.label = "Subfile"
      newEdge:addSource(parent)
      newEdge:addTarget(newNode)
      newEdge:setAsOriented()
      
      graph:addNode(newNode)
      graph:addEdge(newEdge)
    end
  end
end


```

Súbor _luadb/extraction/functioncalls/extractor.lua_ obsahuje funkcie, ktoré extrahujú funkcie a volania, pričom ich delia na globálne a modulové. 

1. Ako prvé sa získajú všetky funkcie z daného stromu, ktoré sa potom v cykle prejdú a pre každú funkciu sa vytvorí uzol s typom funkcia a uložia sa takisto informácie ako meno, či cesta.
2. Následne je nutné vytvoriť hrany, ktoré budú tieto uzly spájať. 


    1. Tu sa sa získajú všetky volania funkcií z abstraktného syntaktického stromu
    2. Listuje sa medzi volaniami, pričom každá funkcia má (môže mať) viacero volaní, ktoré je tiež nutné prelistovať
    3. Pre každné volanie funkcie sa vytvorí hrana, pričom do zdroja a cieľu sa priradia uzly, ktoré sa sa zistia pomocou metódy uzlu _(hypergraph/node.lua)_ _findByName_, ktorá vracia tabuľku uzlov. (v tomto prípdade uzlov funkcii, kedže tie sa do nej posielajú)
    4. Ak hrana (volanie) nevolá nijakú funkciu, tak je roztriedená podľa toho, či je globálna alebo modulová do príslušných polí v grafe. (graph.moduleCalls alebo graph.globalCalls)
    5. Nová hrana sa nastaví ako orientovaná a je pridaná do grafu. 
    6. Funkcia extract, ktorá volá zvyšné funkcie, vracia hrany(volania funkcií) a uzly(funkcie). 


``` lua hl_lines="4 6 7 16 17 20 22 25 26"
local function extractFunctionCalls(AST, graph, nodes)
  local edges = {}
  local functions = ast.getFunctions(AST)
  local functionsCalls = ast.getFunctionsCalls(AST)
  
  for calledFunction,functionCalls in pairs(functionsCalls) do
    for index,call in pairs(functionCalls) do
      local newEdge = hypergraph.edge.new()
      newEdge.label = "FunctionCall"
      newEdge.meta  = newEdge.meta or {}
      newEdge.meta.calleeFunction = getCalleeFunctionName(call)
      newEdge.meta.calledFunction = calledFunction
      newEdge.data.text = call.text
      newEdge.data.position = call.position
      newEdge.data.tag = call.tag
      newEdge:addSource(hypergraph.node.findByName(nodes, newEdge.meta.calleeFunction))
      newEdge:addTarget(hypergraph.node.findByName(nodes, calledFunction))
              
      -- function's declaration not found
      if utils.isEmpty(newEdge.to) then
        logger:debug('found undeclared function '..calledFunction)
        addGlobalCall(graph, newEdge, call, calledFunction)
      end
      
      newEdge:setAsOriented()
      graph:addEdge(newEdge)
      table.insert(edges, newEdge)
    end
  end
  return edges
end

```
Tretím súborom, ktorý rieši extrakciu uzlov a hrán v luaDB module je súbor priamo v priečinku _luadb/extraction_ a to _extraction.lua_.

1. Ako prvá sa volá funkcia getFilesTree(graph, sourceDirectory) zo súboru _luadb/extraction/filestree/extractor.lua_ , ktorá je popísaná v prvej časti dokumentu
2. V tejto chvíli máme uzly typu file, ktoré potrebujeme prehľadať a získať z nich uzly typu function a to za pomoci funkcie getFunctionCalls(graph, luaFileNodes).

    1. V tejto funkcii sa listujú všetky súborové uzly
    2. Pre každý uzol sa zavolá funkcionalita zo súboru _src/luadb/extraction/functioncalls/extractor.lua_ popísanom vyššie, takže v tomto bode už máme aj funkcie a volania funkcií. 
    3. Pre každý uzol priradíme do functionNodes uzly funkcií a do functionCalls hrany volaní funkcií získané v kroku vyššie.
    4. Následne každý uzol funkcie napojím novovytvorenou hranou na príslušný uzol súboru (takto viem, ktoré funkcie patrie ktorému súboru)
    <pre>```
    for j,functionNode in pairs(luaFileNode.functionNodes) do
      local connection = hypergraph.edge.new()
      connection.label = "FunctionDeclaration"
      connection:addSource(luaFileNode)
      connection:addTarget(functionNode)
      graph:addEdge(connection)
    end
    ```</pre>
    5. Takisto preiterujem aj všetky volania funkcií a ak majú nastavený zdroj tak túto hodnotu nahradíme uzlom aktuálneho súboru. Predtým bol nastavený pomocou metódy _findByName_ a teda nabral hodnotu tabuľky uzlov funkcií, teda funkcia, ktorá tento uzol (funkciu) volala pochádzala z tohto súboru. 
     <pre>```
    for k,functionCallEdge in pairs(luaFileNode.functionCalls) do
      if utils.isEmpty(functionCallEdge.from) then
      functionCallEdge.label = "FunctionCall"
      functionCallEdge:addSource(luaFileNode)
      end
    end
    ```</pre>

Ako bolo spomínané pri opise súboru _src/luadb/extraction/functioncalls/extractor.lua_ volania funkcií, ktoré nemali cieľovú funkciu, (nemali target/to), čiže nevolali inú funkciu, boli roztriedené do dvoch skupín na globálne a modulové. V tomto súbore sa napoja na graf aj tieto hrany a to vo funkciách  connectModuleCalls(graph)
a  assignGlobalCalls(graph).

**connectModuleCalls(graph)**

V tejto funkcií sa napoja na graf modulové funkcie. 

1.  Prelistujú sa všetky modulové volania pričom pre všetky volania sa :

    1. získa názov modulu a cesta k nemu
    2. prelistujú všetky súborové uzly a hľadá sa taký, ktorý má rovnakú cestu ako je cesta k modulu a zároveň či vo funkciách daného súborového uzlu existuje funkcia, ktorá má rovnaký názov ako dané modulové volania (teda sa pozrie, či a, existuje súbor z ktorého bola funkcia volaná, b, či v tom súbore existuje funkcia, ktorá bola volaná) 
    3. ak áno sú tieto uzly funkcii pridané do pomocného poľa
    <pre>```
     for i,luaFileNode in pairs(luaFileNodes) do
      if luaFileNode.data.path:find(modulePath) and getFunctionWithName(luaFileNode.functionNodes, moduleFunctionCall) ~= nil then 
        functionNodes = luaFileNode.functionNodes
      end
     end
    ```</pre>
    4. Ak takáto funkcia (uzol) neexistuje ani jedna, tak sa zaregistruje globálne volanie, funkcionalita bude popísaná nižšie. 
      <pre>```
    if utils.isEmpty(functionNodes) then
      registerGlobalModule(graph, moduleName, moduleFunctionCall)
      functionNodes = getGlobalModuleFunctions(graph, moduleName)
    end
    ```</pre>
    5. Nakoniec sa preiterujú všetky hrany volania a priradia sa k cieľovému uzlu.
      <pre>```
    for j,moduleFunctionCallEdge in pairs(edges) do
        -- add target connection for each module function call
        moduleFunctionCallEdge:addTarget(functionNode)
    end
    ```</pre>
    Tu je možno na mieste si pripomenúť, ako vyzerá jedna položka v tejto iterácii, teda ako vyzerá "key => value" a to tak, že znovu zobrazíme riadok, kďe sa do teraz iterovaných položiek pridával nový prvok. ```table.insert(graph.moduleCalls[calledFunction], newEdge) ``` _calledFunction_ je v tomto prípade meno funkcie, ktoré je kľúčom v poli _moduleCalls_.

**assignGlobalCalls(graph)**

V tejto funkcií sa napoja na graf globálne funkcie. 

1. Preiterujú sa všetky globálne volania(hrany),  pričom pre každé sa:

    1. skontroluje, či po rozdelení ```utils.split(globalFunctionCall, "%.")``` je vzniknuté pole veľkosti 2 ```    if table.getn(parts) == 2 then```. Toto indikuje, že ide o zložené volanie (napr. ```table.insert()```)  

        1. Registruje sa daný modul (_table_) vo funkcii _registerGlobalModule(graph, moduleName, moduleFunctionCall)_. Vytvoria sa uzly pre modul a pre funkciu (_insert_) z daného modulu, takisto sa vytvorí hrana  medzi nimi, ktorá má label _FunctionDeclaration_. Oba uzly aj hrana medzi nimi sú pridané do grafu. 

    2. ak podmienka vyššie nebola vyhodnotená ako _true_ ide o globálnu funkciu, napríklad ```pair()``` alebo ```print()```.

        1. Vytvorí sa nový uzol typu _globalFunction_ a pridá sa do grafu.

2. Následne sa prelistujú všetky hrany pre danú funkciu (table.insert(graph.globalCalls[calledFunction], newEdge) hrany) a aktuálna funkcia (node) sa pridá ako ich Target, teda atribút _to_ .