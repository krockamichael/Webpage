# Mkdocs

MkDocs je rýchly, jednoduchý statický generátor stránok, ktorý je zameraný na generovanie projektovej dokumentácie. Zdrojové súbory dokumentácie sú zapísané v Markdown a konfigurované pomocou jedného konfiguračného súboru YAML.

MkDocs vytvára statické HTML stránky, ktoré môžu byť hostované na stránkach GitHub, Amazon S3 alebo kdekoľvek inde.

## Pluginy

Do MkDocs je možné pridať ďalšie pluginy, pre rozšírenie funkcionality.

### Macros

Plugin [makrá](https://github.com/fralau/mkdocs_macros_plugin) nám umožňuje vytvoriť si vlastné funkcie a tie využívať pri písaní dokumentácie.
Makrá sú zapísané v súbore `main.py` vo funkcii `define_env`, kde sú označené `@env.macro` tagom.

Aktuálne je definované jedno makro `code_snippet`. Toto slúži na dosadenie častí kódu do dokumentácie.
Funkcia berie dva vstupné argumenty:

- `path` cesta k súboru, v ktorom sa nachádza kód, ktorý chcem vložiť. Cesta sa zapisuje od src/ adresára.
Príklad z luagit repozitára: `src/luagit/repository.lua` zapíšem ako `luagit/repository.lua`.
- `tag` názov tagu. Ten musí byť unikátny vrámci jedného súboru.

#### Použitie makra
`code_snippet("luagit/repository.lua", "executeOsCommand")`

Makro sa vkladá do dvoch vnorených {}.

Pre zistenie presnej cesty k súbory je možné sa pozrieť do artefaktu pipeline. Príklad pre [develop](https://gitlab.com/FIIT/3DSoftVis_Remake/documentation/-/jobs/artifacts/develop/browse?job=download+snippets).

Pred vložením časti kódu pomocou makra do dokumentácie, je potrebné si najprv zvolenú časť kódu označiť v príslušnom
súbore so zdrojovým kódom. Začiatok ukážky kódu je označený komentárom `code_block start <<názov tagu>>`, koniec ukážky je označený
komentárom `code_block end <<názov tagu>>`.
Začiatočný aj konečný názov tagu musí byť pre jednu ukážku kódu rovnaký. Vždy musí byť zapísaný začiatočný aj ukončujúci tag.
Ukážky kódu môžu byť do seba vnorené alebo sa prekrývať.

Aby boli makrá funkčné aj pri lokálnom spustení mkdocs-u, je potrebné si stiahnuť artefakt s vygenerovanými snippetmi a
umiestniť ho do priečinka s dokumentáciou.
