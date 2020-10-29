# C++ Core

## LuaInterface

Tento modul zabezpečuje komunikáciu C# časti s Lua časťou využitím `Sol2` knižnice. Je naprogramovaný v jazyku C++. Poskytuje základné funkcie pre vykonávanie Lua kódu, volanie Lua funkcii, a získavanie informácií z modulov v jazyku Lua. Každá funkcia, ktorá má byť prístupná v `Lua.Common` module by mala mať svoj ekvivalent v príslušnom `ExportC` súbore. Napríklad pre `LuaInterface.cpp` je to `LuaInterfaceExportC.cpp`. Tieto funkcie sa musia nachádzať v extern “c” bloku a musia mať definíciu kompatibilnú s jazykom C.

## LuaGraph

Úlohou tohto modulu je s využitím modulu `LuaInterface` načítať LuaDB graf z jazyka Lua do jazyka C++. Jeho hlavná logika sa nachádza vo funkcii `LuaGraph::loadGraph(int id)`. Podobne ako `LuaInterface`, každá pridaná funkcia, ktorá má byť prístupná v `Lua.Common` by mala byť definovaná aj v príslušnom `ExportC` súbore.
