# Lua v 3DSoftViz

Hlavným Lua súborom na interakciu s vyššími vrstvami a prácu s grafom je súbor `resources/scripts/app/main.lua`. V tomto súbore sa nachádza funkcia `loadGraph()`, ktorá je volaná z vyšších vrstiev, a slúži na načítanie grafu. Parametre funkcie môžeme vidieť nižšie. Ide prevažne o špecifikáciu grafu a konfiguráciu, v akej sa má graf načítať.

Vo funkcii `loadGraph()` si môžeme všimnúť vytvorenie dvoch objektov - `layoutFactory` a `graphHandler`, ktoré si popíšeme v ďalšej časti.

Funkcia `loadGraph()` pridá do poľa `loadedGraphs` `graphHandler` s príslušnou konfiguráciou.

```lua
function loadGraph(path, extractor, algorithm, buildingLayouter, functionMode, variableMode)
    local algorithm = algorithm
    local optionalSetup =
    {
        buildingLayouterType = buildingLayouter,
        functionMode = functionMode,
        variableMode = variableMode
    }
    local factory = layoutFactory.new(algorithm, optionalSetup)

    local graphHandler = graph_handler.new()
    if extractor == 'EvoGraph' then
        graphHandler:extractEvoGraph(graphManager:findFirstGraph(), graphManager:findLastGraph(), factory)
    else
        graphHandler:extractGraph(path, extractor, factory)
    end

    loadedGraphs[inc()] = graphHandler
end
```

`resources/scripts/module/softviz/graph_handler.lua` je modul, ktorý slúži na prácu s grafom pri načítavaní. Funkcia `extranctGraph()`, ktorú môžeme vidieť nižšie je volaná pri pridávaní `graphHandleru` do vyššie spomínaného poľa grafov. Táto funkcia na vstupe prijme cestu ku grafu, extraktor grafu a tzv. `layoutFactory`, ktorú si popíšeme nižšie. Toto sú všetko parametre konfigurácie, ktoré sa nastavujú v Unity časti a sem sa prešíria cez jednotlivé vrstvy pomocou volaní funkcií.

V tejto funkcii sa volá funkcia z modulu `Projects/LuaDependencies/luadb/src/luadb/extraction/extractor.lua`, v ktorej prebieha samotná extrakcia a načítavanie grafu. Nachádzajú sa tu funkcie, ktoré zistia názvy funkcií v načítavanom grafe, ich volania, volania modulov, globálne volania a rôzne iné parametre zdrojového kódu. Tieto následne poprepájajú do grafu.

Nakoniec je zavolaná funkcia `loadFromLuadbGraph()`, ktorú si popíšeme v ďalšej časti.

```lua
function pGraphHandler:extractGraph(absolutePath, graphPicker, layoutFactory)
  self.layoutFactory = layoutFactory
  local luadbGraph = {}

  utils.logger:setLevel(utils.logging.INFO)

  utils.logger:info("Started extration")
  if(graphPicker == "FunctionCallGraph") then
    luadbGraph = artifactsExtractor.extract(absolutePath, self.astMan)
  elseif(graphPicker == "ModuleGraph") then    
    luadbGraph = moduleExtractor.extract(absolutePath, self.astMan)
  elseif(graphPicker == "MooscriptGraph") then
    luadbGraph = moonscriptExtractor.getGraphProject(absolutePath, self.astMan)
  else
    utils.logger:info("graphPicker set to unknown value")
  end

  self:loadFromLuadbGraph(luadbGraph)
end
```


Vo funkcii `loadFromLuadbGraph()` je volaná funkcia `addGraph()` z modulu `Projects/LuaDependencies/luadb/src/luadb/manager/graph/manager.lua`, ktorá slúži na jednoduchšie manažovanie grafu. Táto funkcia vytvorí z načítaného grafu dvojičku `graphId - graph`, ktorá je reprezentovaná objektom `GraphNode`.

Následne prebehne vo funkcii `initializeGraph()` inicializácia grafu, kde sa jednotlivým vrcholom a hranám nastavia názvy a iné parametre.

Ako posledná sa zavolá funkcia `layoutManager:initialize()` modulu `resources/scripts/module/layouter/layout_manager.lua`, ktorú si opíšeme nižšie.

```lua
function pGraphHandler:loadFromLuadbGraph(luadbGraph)
  graphManager:addGraph(luadbGraph)
  self.graph = luadbGraph
  self:initializeGraph()

  self.layoutManager = layoutManager.new(self.graph, self.layoutFactory)
  self.layoutManager:initialize()

  utils.logger:info("Extraction successfully finished")

  self.layoutManager:updateVisualMapping(luadbGraph.modified_nodes)
end  
```

Poslednou dôležitou funkciou je spomínaná funkcia `initialize()` z modulu `resources/scripts/module/layout_manager.lua`, ktorá grafu nastaví parametre potrebné na správny beh programu. Nastavuje v prvom rade obmedzenia, ďalej nastavuje layoutovač na základe požadovaného layoutovacieho algoritmu a aktualizuje uzly grafu.

```lua
function pLayoutManager:initialize()
    utils.logger:info("LayoutManager::Initialize")

    if self.currentAlgorithm ~= nil then
        self.currentAlgorithm:terminate()    
        self.currentAlgorithm = nil
    end

    if(self.restrictionManager == nil) then
        self.restrictionManager = RestrictionManager.new()
    end


    self.currentAlgorithm = self.layoutFactory:getLayouter(self.graph, self.restrictionManager)
    self.currentAlgorithm:initialize()

    self:updateNodes()

    self.restrictionManager:createRestriction(DefaultRestriction, restrictions.Default())
    self:setRestrictionToAllNodes(DefaultRestriction)
end
```

Po vykonaní týchto funkcií sú v poli `loadedGraphs` v súbore `main.lua` načítané grafy, ku ktorým sa dá pristupovať cez `id` grafu. Po tejto prvotnej inicializácii vedia vyššie vrstvy projektu pristupovať ku poľu a vykonávať nad ním operácie, ako napríklad `getGraph()`, `getLayoutManager()`, `setNodeColor()`, a iné.
