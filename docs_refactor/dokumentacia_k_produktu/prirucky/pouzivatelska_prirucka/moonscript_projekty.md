# 🌓 Analýza Moonscript projektov

Bežne sa softvér 3DSoftViz používa na analyzovanie Lua projektov. Jeho implementácia však umožňuje analyzovanie aj Moonscript projektov.

Potrebné kroky pre analyzovanie Moonscript projektov sú:

1. V časti Unity otvoriť súbor GraphLoader.cs
2. V časti, kde sa pridáva konfigurácia - teda v Configuration.Add():
    1. Nastaviť cestu k Moonscript projektu
    2. Nastaviť atribút GraphExtractor na "GraphExtractor.MoonscriptGraph",  
       čo zabezpečí používanie modulu LuaMeg namiesto LuaDb
