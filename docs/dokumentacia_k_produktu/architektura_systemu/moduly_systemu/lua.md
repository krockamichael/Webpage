# Lua

## Layouter

Tento modul zodpovedá za výpočet rozloženia grafu a správu layoutov grafu.

### Layout Manager

Zodpovedá za spravovanie layoutov grafu. Každý graf má svoj vlastný layout manager.  Obsahuje základne funkcie pre kontrolu layoutovania ako sú štart, stop, pauza. Zabezpečuje to, ktorý algoritmus je v súčasnosti aktívny a zabezpečuje prenos dát z a do algoritmu.

Vo funkcii `updateNodes` dochádza k aktualizovaniu uzlov LuaDB grafu z práve aktívneho algoritmu. Z algoritmu sa načíta pozícia každého uzla, a prípadne ďalšie atribúty uzla, ktoré algoritmus môže obsahovať, ako napríklad veľkosť uzla, a táto pozícia sa nastaví zodpovedajúcemu uzlu v LuaDB grafe.

### Algoritmus Fruchterman-Reingold

Jeho implementácia je v jazyku terra, ktorého rýchlosť je porovnateľná s jazykom C. Algoritmus si na začiatku vytvorí kópiu LuaDB grafov. Z lua tabuliek obsahujúcich uzly a hrany si vytvorí pole terra štruktúr `TNode` a `TEdge`, ktoré reprezentujú graf a obsahujú všetky atribúty, ktoré sú potrebné pre výpočet rozloženia grafu. Vo funkcii `initialize`, sa vypočíta počiatočné rozloženie grafu. Po zavolaní funkcie `runLayouting` sa vytvorí nové vlákno, kde iteratívne prebieha výpočet nového rozloženia grafu.

## LuaDB

Modul je napísaný v programovacom jazyku Lua. Jeho hlavnou úlohou je analýza zdrojového kódu, ktorý je modulu poskytnutý zatiaľ zadaním priamej cesty, analyzuje volania funkcií, komplexitu, a rôzne metriky, na základe ktorých sa neskôr ostatné moduly rozhodujú o vlastnostiach vykreslenia uzlu, napríklad veľkosť uzlu.
