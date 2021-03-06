# Doc extra

Tento image slúži pre dodatočné skripty pre generovanie dokumentácie.
Obsahuje dva skripty, `snippet-extract.py` a `artifact-download.py`

## snippet-extract.py
Skript slúži na generovanie/extrahovanie ukážok zo zdrojového kódu.
Má dva argumenty, vstupný a výstupný priečinok. 

Skript rekurzívne prehľadáva vstupný priečinok. Následne v každom nájdenom súbore
hľadá komentáre `code_block start` a `code_block end` a obsah medzi nimi uloží 
do jednotlivých súborov. Novo vytvorené súbory zachovávajú pôvodnú adresárovú 
štruktúru a nachádzajú sa v priečinku `snippets`.

Za komentárom `code_block start` a `code_block end` sa vždy musí nachádzať tag.
Tag musí byť rovnaký pre začiatočný aj ukončujúci komentár. Obsahovať môže len 
alfanumerické znaky, `-` a `_`.

Skript podporuje spracovanie súborov pre jazyky C++, C#, Lua, Python a Bash/Shell.
Jazyky sú rozlíšené pomocou prípony súboru.

## artifact-download.py
Týmto skriptom sa sťahujú artefakty z ostatných repozitárov s podporou
záložných vetiev pre prípad, že artefakt na primárnej vetve neexistuje.
Primárne sa používa na sťahovanie ukážok zdrojového kódu.
Pre fungovanie potrebuje personal access token s oprávnením `read_api`.

Skript má viacero argumentov:

- `repository`  
  názov/cesta k repozitáru (napr. `FIIT/Common/Lua/luameg`)
- `job`  
  názov jobu generújúceho požadovaný artefakt
- `--branch`/`-b`  
  názov vetvy z ktorej požadujeme artefakt
- `--fallback-branch`  
  názov jednej alebo viacerých záložných vetiev
- `--extract-dir`  
  názov cieľového adresára pre rozbalený obsah. Bez adresára sa uloží celý zip
- `--token`  
  prístupový token
- `--soft-fail`  
  príznak aby program skončil bez chybového kódu, ak sa nepodarí artefakt stiahnuť
