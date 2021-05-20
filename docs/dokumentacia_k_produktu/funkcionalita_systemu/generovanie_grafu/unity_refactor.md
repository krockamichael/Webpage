# Unity - Refactor

Načítavanie a inú prácu s grafom riadi `GraphController`. Po stlačení tlačidla Start sa volá metóda `LoadGraph` z tohto kontrolera, ktorá pošle na Lua server požiadavky na načítanie, inicializovanie grafu, na spustenie layoutovania a update uzlov. Následne volá načítanie grafu aj na Unity strane, a týmto volaním sa presúvame do triedy `ClientGraph`.

Načítanie grafu znamená vytvorenie uzlov a hrán s atribútmi, ktoré sme dostali od Lua servera. Vytváranie uzlov prebieha v metóde `CreateNodes` v týchto krokoch:

1. Vypýta sa od Lua servera stĺpec s atribútmi ID uzlov. Lua server vráti JSON. 
2. Deserializuje sa JSON a uzly sa uložia do listu.
3. Pre každý uzol v liste:
	a. Vytvoríme objekt v scéne podľa prefabu.
	b. Prebehne inicializácia.
	c. Uzol sa pridá do dictionary uzlov, kde kľúč je ID a hodnota je komponent `ClientNode`.
4. Prebehne update všetkých komponentov (farba, tvar, veľkosť a iné ... ).

```cs
private void CreateNodes()
{
    lastCall = Time.time;

    ColumnNodeId nodesId = JsonToColumn<ColumnNodeId> (ApiController.Instance.GetNodeIdColumn());

    foreach (var item in nodesId.list)
    {
         var v = Instantiate(nodePrefab, nodesHolder);
         v.GetComponent<ClientNode>().Initialize(item.id, new Vector3(UnityEngine.Random.Range(-5f, 5f), UnityEngine.Random.Range(-5f, 5f), UnityEngine.Random.Range(-5f, 5f)));
         Nodes.Add(item.id, v.GetComponent<ClientNode>());
    }

    UpdateNodesShapes();
    UpdateNodesColor();
    UpdateNodesSize();
    UpdateNodesLabel();
    UpdateNodesFiltered();
    UpdateNodesMetrics();
    UpdateNodesInfoflowMetrics();
    UpdateNodesType();
    UpdateNodesBody();
}
```

Vytváranie hrán prebieha veľmi podobne. Hrana ale nemá vlastné ID, ale má ID zdrojového a cieľového uzla a tie sa vypýtajú od Lua servera. 

Podstatným krokom nie len pri vytváraní grafu, ale pri akejkoľvek manipulácii s grafom je update komponentov. Komponenty sa updatujú v metódach `CreateNodes`, `CreateEdges`, `UpdateNodes` a `UpdateEdges`. Každý komponent má potom vlastnú metódu, v ktorej sa updatne. Princíp je pri všetkých komponentoch rovnaký:

1. Vypýta sa od Lua servera stĺpec s atribútom. Lua server vráti JSON. 
2. Deserializuje sa JSON.
3. Objekty po deserializácii sa uložia do dictionary, kde kľúč je ID uzla, resp. hrany a hodnota je hodnota atribútu typu napr. Color, Vector3, int, bool, string a pod., závisí od komponentu.
4. Pre každý prvok v dictionary:
	a. Ak je daný uzol aktívny, updatne sa mu komponent na danú hodnotu.

```cs
public void UpdateNodesColor()
{
    Dictionary<int, Color> dictionary = JsonToColumn<ColumnNodeEdgeColor>
    (ApiController.Instance.GetNodeColorColumn())
        .ToDictionary() as Dictionary<int, Color>;

    foreach (var item in dictionary)
    {
         if (Nodes[item.Key].gameObject.activeSelf)
             Nodes[item.Key].UpdateColor(item.Value);
    }
}
```

Updatovaním konkrétneho komponentu sa dostávame do triedy `ClientNode`, resp. `ClientEdge`.

Metódy, ktoré updatujú jednotlivé komponenty sú si opäť veľmi podobné. Tu je potrebné podotknúť, že všetky vlastnosti uzla, resp. hrany, pre jednoduchosť voláme „komponenty“, aj keď to úplne nie je správne. 

Skutočné Unity komponenty sú len niektoré z nich – napr. farba, pozícia, tvar. Pre niektoré vlastnosti totiž nebolo potrebné vytvárať nové skripty, napríklad vlastnosť isFiltered, ktorá určuje, či má byť uzol odfiltrovaný – tu teda stačí hneď nastaviť uzol na neaktívny.

Pre tie komplikovanejšie z vlastností, ktoré sú skutočnými Unity komponentami uzla alebo hrany, sa vezme komponent od objektu a zavolá sa metóda na nastavenie hodnoty v komponente.

```cs
public void UpdateColor(Color color)
{
    var nc = GetComponent<NodeEdgeColor>();

    if (nc == null)
    {
         nc = gameObject.AddComponent(typeof(NodeEdgeColor)) as NodeEdgeColor;
    }

    nc.SetColorNode(color);
}
```

Zavolaním metódy komponentu sa dostávame do skriptu daného komponentu (napr. `NodeEdgeColor`).  Tu sa už vykoná naozaj všetko potrebné na to, aby bola zmena viditeľná v Unity scéne (napr. nastaví sa farba v rendereri). 

```cs
public void SetColorNode(Color iColor)
{
    this.color = iColor;

    var renderer = GetComponent<Graph.ClientNode>().ShapeRend;
            
    if (renderer != null)
    {
         renderer.material.color = iColor;

         if (iColor.a < 1f)
         {
              renderer.material.SetFloat("_Mode", 3);
              renderer.material.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.One);
              renderer.material.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
              renderer.material.SetInt("_ZWrite", 0);
              renderer.material.DisableKeyword("_ALPHATEST_ON");
              renderer.material.DisableKeyword("_ALPHABLEND_ON");
              renderer.material.EnableKeyword("_ALPHAPREMULTIPLY_ON");
              renderer.material.renderQueue = 3000;
         }
         return;
    }
}
```

