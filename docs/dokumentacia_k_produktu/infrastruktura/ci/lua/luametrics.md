# LuaMetrics

Pipeline sa skladá z `before_script` a 2 stage. Celá pipeline využíva image
`registry.gitlab.com/fiit/common/ci-images/lua`, ktorý obsahuje potrebné
závislosti pre zostavovanie, testovanie a dokumentáciu modulov vytvorených v jazyku Lua.

## `before_script`
 - import SSH klúčov

## `build` stage
 - sťahovanie závislosti
 - cmake a následne make
 - vygenerovanie dokumentácie zo zdrojového kódu nástrojom `ldoc` do adresára `doc` v HTML formáte
 - vygenerovanie code snippetov pomocou [doc-extra/snippet-extract.py](../gitlab_images/doc_extra.md)

## `test` stage
 - spustenie testov vo frameworku busted
 - kontrola pokrytia zdrojového kódu nástrojom `luacov`
 - statická analýza zdrojového kódu v jazyku Lua

## `deploy` stage
 - export vygenerovanej dokumentácie na vzdialený server prostredníctvom programu `rsync`
