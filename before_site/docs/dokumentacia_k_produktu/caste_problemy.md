# 🐞 Časté problémy

## Vytváranie objektov starou syntaxou

Niektoré Lua moduly využívajú starú syntax vytvárania objektov v tvare `module(_nazov_modulu_)` namiesto novej syntaxe, ktorá vracia vybrané funkcie a premenné modulu prostredníctvom návratovej hodnoty vo forme tabuľky v nižšie uvedenom tvare.

### Vytváranie objektov novou syntaxou
```
local logger
local mojaPremenna
local moja Funkcia

return {
    logger = logger,
    mojaPremenna = mojaPremenna,
    mojaFunkcia = mojaFunkcia
}
```
### Výskyt starej syntaxe
Stará syntax je použitá v nasledujúcich moduloch :

* `Luametrics`
    * metrics/init.lua
    * metrics/rules.lua
    * metrics/captures/ast.lua
    * metrics/captures/block.lua
    * metrics/captures/cyclomatic.lua
    * metrics/captures/document_metrics.lua
    * metrics/captures/functiontree.lua
    * metrics/captures/halstead.lua
    * metrics/captures/hypergraph.lua
    * metrics/captures/infoflow.lua
    * metrics/captures/LOC.lua
    * metrics/captures/statements.lua
    * metrics/luadoc/captures.lua
    * metrics/luadoc/commentParser.lua
* `Luameg`
    * meg.lua
