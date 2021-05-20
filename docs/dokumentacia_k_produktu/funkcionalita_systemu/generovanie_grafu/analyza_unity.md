# Unity

Celá logika načítavania grafu v Unity sa začína v triede `GraphLoader`. Tento objekt sa nachádza v scéne v Unity a pri načítaní scény, sa podobne ako pri ostatných objektoch, ktoré dedia od triedy MonoBehaviour, zavolá funkcia `Awake()`. V tejto metóde sa najprv do listu konfigurácií, zapíše jedna alebo viacero konfigurácií, ktoré zabezpečujú aký graf sa načíta, kde je uložený, aký algoritmus sa použije a ďalšie iné nastaviteľné parametre.

``` cs
Configurations.Add(new GraphConfiguration
{
    Algorithm = LayoutAlgorithmsEnum.FruchtermanReingold,
    Path = $"{Application.streamingAssetsPath}/LuaScripts/Modules/say",
    GraphExtractor = GraphExtractor.ModuleGraph,
    OptionalParameters = new OptionalParameters
    {
        BuildingLayout = BuildingLayoutAlgorithmEnum.RowAlgorithm,
        FunctionType = FunctionTypeEnum.Cyclomatic,
        VariableType = VariableTypeEnum.None
    }
});
```

Ďalej sa tu zavolá funkcia `InvokeRepeating()`, ktorá zabezpečuje aktualizovanie grafu každých X sekúnd. Tu sa pošlú tri parametre. Prvým je názov funkcie, ktorá sa má opakovať, druhým je čas, kedy sa funkcia prvý krát zavolá a tretím je časový interval medzi jednotlivými volaniami. V našom prípade funkcia, ktorá sa bude volať opakovane, nesie názov UpdateGraph a taktiež sa nachádza v triede `GraphLoader`.

``` c#
InvokeRepeating(nameof(GraphLoader.UpdateGraph),
                GraphLoader.UpdateTimeInitialDelayTime,
                GraphLoader.UpdateTimeRepeatingTime);
```

Samotné načítanie grafu sa uskutoční zavolaním funckie LoadAllGraphs na objekte `GraphManager`. `GraphManager` je trieda, ktorá sa nachádza v module `GraphCore` a ako parameter sa tu pošle zoznam s konfiguráciami.

``` c#
GraphManager.LoadAllGraphs(Configurations);
```

V tejto funkcii sa postupne prejdú jednotlivé konfigurácie a prostredníctvom `LuaInterface.Instance.DoString()` sa zavolá metóda `loadGraph()` s konkrétnou konfiguráciou. Následne sa na novovytvorenom objekte `LuaGraph` zavolá funkcia `LoadGraph()`, ktorá na vstupe prijme index grafu.

``` c#
public void LoadAllGraphs(List<GraphConfiguration> configurations)
{
    for (var i = 0; i < configurations.Count; ++i)
    {
        var configuration = configurations[i];
        LuaInterface.Instance.DoString($"loadGraph({configuration.ToLuaTable()})");

        var luaGraph = new LuaGraph();
        luaGraph.LoadGraph(i);
        Graphs.Add(new Graph(luaGraph, configuration));
    }
}
```

V tejto funkcii sa zavolá metóda `LuaGraphLoadGraph()`, ktorá vyvolá metódu `loadGraph()` v module `LuaGraph`. Následne sa tu volajú funkcie `LoadNodes()`, `LoadEdges()` a `LoadIncidences()`, ktoré do príslušných listov načítajú objekty z Lua a namapujú ich na tie, s ktorými sa pracuje v rámci C#. V týchto funkciách sa každému objektu priradí iba `Id` a `Label`.

``` c#
public void LoadGraph(int graphId)
{
    GraphId = graphId;
    LuaGraphLoadGraph(NativeObject, graphId);

    Nodes = LoadNodes();
    Edges = LoadEdges();
    Incidences = LoadIncidences();
}
```

``` c#
protected IList<LuaNode> LoadNodes()
{
    return MarshallingUtils.ReadArray<LuaNodeDTO, LuaNode>(
                LuaGraphGetNodesSize(NativeObject),
                a => LuaGraphGetNodes(NativeObject, a),
                a => MapNode(a))
                .ToList();
}
```

``` c#
private unsafe LuaNode MapNode(IntPtr node)
{
    var nodeDTO = *(LuaNodeDTO*)node;
    return new LuaNode(nodeDTO.NativeLuaNode)
    {
        Id = nodeDTO.Id,
        Label = MarshallingUtils.ReadString(nodeDTO.Label) ?? UnknownLabel
    };
}
```

Následne sa načítaný objekt `LuaGraph` pretransformuje na objekt `Graph` a ten sa pridá do listu grafov. V konštruktore objektu `Graph` sa nainicializujú potrebné hodnoty a následne sa zavolá funkcia `InitializeGraph()`.

``` c#
public Graph(LuaGraph luaGraph, GraphConfiguration configuration)
{
    LuaGraph = luaGraph;
    LayoutManager = new LayoutManager(LuaGraph.GraphId);
    LayoutFactory = new LayoutFactory(LuaGraph.GraphId);
    Nodes = new ObservableCollection<Node>();
    Edges = new ObservableCollection<Edge>();
    luaNodesMapping = new List<Tuple<LuaNode, Node>>();
    luaEdgesMapping = new List<Tuple<LuaEdge, Edge>>();
    CurrentConfiguration = configuration;

    InitializeGraph();
}
```

V tejto funkcii sa opäť pretransformujú jednotlivé LuaObjekty na tie, potrebné pre ďalšiu prácu. `LuaNode` -> `Node`, `LuaEdge` -> `Edge`. List s LuaIndices sa nevyužíva.

``` c#
protected void InitializeGraph()
{
    var luaNodes = LuaGraph.Nodes;
    var luaEdges = LuaGraph.Edges;
    var luaIncidences = LuaGraph.Incidences;

    foreach (var luaNode in luaNodes)
    {
        var node = GraphObjectFactory.CreateNodeFromLuaNode(luaNode);

        if (!IsFiltered(luaNode))
        {
            Nodes.Add(node);
        }

        luaNodesMapping.Add((luaNode, node).ToTuple());
    }

    foreach (var luaEdge in luaEdges)
    {
        var sourceNodeId = luaEdge.Data.SourceId;
        var destinationNodeId = luaEdge.Data.DestinationId;

        var edge = GraphObjectFactory.CreateEdgeFromLuaEdge(
            luaEdge,
            AllCreatedNodes.First(node => node.Id == sourceNodeId),
            AllCreatedNodes.First(node => node.Id == destinationNodeId));

        AllCreatedEdges.Add(edge);

        if (!edge.IsFiltered && IsVisible(luaEdge))
        {
            Edges.Add(edge);
        }

        luaEdgesMapping.Add((luaEdge, edge).ToTuple());
    }

    RecreateHierarchy();
}
```

V nasledujúcich funkciách je možné vidieť, aké dáta si jednotlivé objekty uchovávajú.

``` c#
public static Node CreateNodeFromLuaNode(LuaNode luaNode)
{
    return new Node
    {
        LuaNode = luaNode,
        Id = luaNode.Id,
        Label = luaNode.Label,
        Type = luaNode.RawData.GetString("type"),
        Position = luaNode.Data.Position,
        Size = luaNode.Data.Size,
        IsFiltered = (int)luaNode.RawData.GetFloat("filtered.value", true) == 1, // Fix this
        Color = luaNode.Data.Color,
        Shape = luaNode.Data.Shape,
        Flag = luaNode.Data.Flag,
        IsFixed = luaNode.Data.Layouter.GetBool("isFixed"),
        EvolutionData = luaNode.Data.Evolution,
    };
}

public static Edge CreateEdgeFromLuaEdge(LuaEdge luaEdge, Node sourceNode, Node destinationNode)
{
    return new Edge
    {
        LuaEdge = luaEdge,
        Id = luaEdge.Id,
        SourceNode = sourceNode,
        DestinationNode = destinationNode,
        Label = luaEdge.Label,
        Flag = luaEdge.Data.Flag,
        Color = luaEdge.Data.Color,
        IsFiltered = sourceNode.IsFiltered || destinationNode.IsFiltered,
    };
}
```

Poslednou metódou, ktorá sa volá vo funkcii `InitializeGraph()` je metóda `RecreateHierarchy()`, ktorá zabezpečuje to, aby sa podľa jednotlivých hrán vytvorili dvojice uzlov, ktoré tieto hranu spájajú.

``` c#
private void RecreateHierarchy()
{
    Hierarchy = new List<Tuple<Node, Node>>();
    foreach (var edge in LuaGraph.Edges)
    {
        if (IsParent(edge) && !IsFiltered(edge))
        {
            var sourceNode = Nodes.FirstOrDefault(x => x.Id == edge.Data.SourceId);
            var destinatioNode = Nodes.FirstOrDefault(x => x.Id == edge.Data.DestinationId);
            Hierarchy.Add(new Tuple<Node, Node>(sourceNode, destinatioNode));
        }
    }
}
```

Týmto sme prebehli celú `GraphCore` vrstvu a môžeme sa vrátiť do funkcie `Awake()` v triede `GraphLoader`. Tu nám ostala ešte jedna funkcia a to `CreateGraphs()`. Tá zabezpečuje vytvorenie jednotlivých objektov z príslušného prefabu pre graf. Každý takýto objekt musí obsahovať komponent `GraphUnity`. Nad týmto komponentom sa zavolá metóda `InitializeGraph()`, ktorá inštancuje všetky viditeľné uzly a hrany podľa príslušných prefabov prostredníctvom metód `CreateNode()` a `CreateEdge()`.

``` c#
public void InitializeGraph(CoreGraph graph)
{
    BaseGraph = graph;
    nodes = graph.Nodes;
    edges = graph.Edges;

    if (nodes != null)
    {
        nodes.CollectionChanged += OnNodesChanged;
        foreach (var node in nodes)
        {
            if (!node.IsFiltered)
                CreateNode(node);
        }
    }

    if (edges != null)
    {
        edges.CollectionChanged += OnEdgesChanged;
        foreach (var edge in edges)
        {
            if (!edge.IsFiltered)
                CreateEdge(edge);
        }
    }

    if (graph.Hierarchy != null)
    {
        foreach (var link in graph.Hierarchy)
        {
            var source = nodeScripts.FirstOrDefault(a => a.Id == link.Item1.Id);
            var destination = nodeScripts.FirstOrDefault(a => a.Id == link.Item2.Id);

            destination.gameObject.transform.SetParent(source.gameObject.transform, true);
            destination.gameObject.transform.localPosition = new Vector3(destination.BaseObject.Position.X, destination.BaseObject.Position.Y, destination.BaseObject.Position.Z);
            destination.gameObject.transform.localScale = new Vector3(1, 1, 1);
        }
    }
}

private GameObject CreateNode(Node node)
{
    GameObject nodePrefab = (GameObject)Instantiate(Resources.Load(GraphUnity.NodePrefabPath), gameObject.transform);
    var nodeScript = nodePrefab.GetComponent<NodeUnity>();
    nodeScript.BaseObject = node;
    nodeScript.Mesh = NodeMesh;
    nodeScript.tag = GameObjectTags.Node;
    nodeScripts.Add(nodeScript);
    nodePrefab.transform.localPosition = new Vector3(node.Position.X, node.Position.Y, node.Position.Z);
    node.PropertyChanged += nodeScript.OnNodeChanged;

    return nodePrefab;
}

private void CreateEdge(Edge edge)
{
    var source = nodeScripts.FirstOrDefault(a => a.Id == edge.SourceNode.Id);
    var destination = nodeScripts.FirstOrDefault(a => a.Id == edge.DestinationNode.Id);

    GameObject edgePrefab = (GameObject)Instantiate(Resources.Load(GraphUnity.EdgePrefabPath), gameObject.transform);
    var edgeScript = edgePrefab.GetComponent<EdgeUnity>();
    edgeScript.BaseObject = edge;
    edgeScript.Mesh = EdgeMesh;
    edgeScript.SourceNode = source;
    edgeScript.DestinationNode = destination;

    edgeScripts.Add(edgeScript);
}
```
