# C# Core

## Lua.Common

Tento modul využíva `PInvoke` pre prístup k funkciám exportovaným v C++ DLL `LuaGraph` a `LuaInterface`. Jeho jedinou úlohou je zjednodušiť prístup k týmto funkciám. Hlavnými triedami sú `LuaInterface` a `LuaGraph`, ktoré volajú príslušné C++ funkcie a v prípade potreby vykonávajú konverziu dát na príslušné dátové typy v jazyku C#. Pre zjednodušenie načítania poľa, štruktúr a stringov bola vytvorená trieda `MarshallingUtils`, ktorá obsahuje pomocné metódy na prevod týchto dátových typov z jazyka C do C#.

Pre reprezentáciu akéhokoľvek objektu v jazyku Lua slúži trieda `LuaObject`, ktorá implementuje aj konverziu lua typu na C# typ. Keďže väčšina tried v tomto module pracuje priamo s pamäťou, je potrebné myslieť na to, že túto pamäť treba manuálne dealokovať pretože nebude odstránená automaticky garbage collectorom. Pre zjednodušenie je každá takáto trieda implementovaná návrhovým vzorom `Dispose`. Je na to potrebné myslieť najmä pri volaní metód `LuaObject.GetObject` a `LuaInterface.GetObject` (a každej inej, ktorá priamo vracia `LuaObject`), pretože dealokácia pamäti, ktorú si alokuje `LuaObject`, je na tom, kto túto funkciu zavolal.

Pre zjednodušenie načítania dát pre uzly a hrany z tabuľky data v LuaDb grafe bol vytvorený atribút `LuaParameterAttribute`. Každý údaj v tabuľke `data`, ktorý chceme načítať by mal mať svoj ekvivalent v triede `LuaNodeData/LuaNodeEdge` alebo `GraphObjectData`, ak ide o spoločnú vlastnosť ako je napríklad farba. Každá premenná tejto triedy by mala byť označená atribútom `LuaParameter`, kde v parametri `LuaName` by mal byť názov tejto premennej v `data` tabuľke. Všetky premenné označené týmto atribútom sú automaticky pri vytvorení objektu typu `GraphObject` načítané z LuaDB grafu vo funkcii `GraphObject.LoadData`. Pri odstránení objektu typu `GraphObject` je automatický dealokovaná všetka pamäť, ktorú tieto dáta používajú, takže nie je potrebné volať metódu `Dispose` na žiadnej premennej označenej týmto atribútom.

## GraphCore

V tomto module je obsiahnutá celá logika týkajúca sa grafu. V metóde `Graph.InitializeGraph` dochádza k vytvoreniu grafu z `Lua.Common.Graph`. K ďalšiemu aktualizovaniu tohto grafu z LuaDb grafu dochádza v metóde `Graph.UpdateNodes`, ktorá sa prostredníctom `GraphManager`-a volá v pravidelných intervaloch z unity herného objektu `GraphLoader`. Súčasťou modulu je trieda `LayoutManager`, ktora je reprezentáciou layout managera, ktorý sa nachádza v module `layouter`.

Vlastnosti objektov typu `GraphCore.Node` a `GraphCore.Edge`, ktoré sa pravidelne menia, ako napríklad farba, pozícia, tvar a podobne, by mali obsahovať aj príslušnú udalosť, ktorá signalizuje zmenu tohto atribútu, aby bolo možné podľa neho následne aktualizovať vizuálnu reprezentáciu grafu v Unity.
