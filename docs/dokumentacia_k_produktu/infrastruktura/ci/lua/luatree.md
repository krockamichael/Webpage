# LuaTree

Pipeline sa skladá z `before_script` a 2 stage. Celá pipeline využíva image
`registry.gitlab.com/fiit/common/ci-images/lua`, ktorý obsahuje potrebné
závislosti pre zostavovanie, testovanie a dokumentáciu modulov vytvorených v jazyku Lua.

## `before_script`
 - import SSH klúčov

## `generate_doc` stage
 - vygenerovanie dokumentácie zo zdrojového kódu nástrojom `ldoc` do adresára `doc` v HTML formáte

## `deploy_docs` stage
 - export vygenerovanej dokumentácie na vzdialený server prostredníctvom programu `rsync`
