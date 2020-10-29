# Dokumentácia

Pipeline sa skladá z `before_script` a troch stage, `prepare`, `build` a `deploy`,
a je spúštaná na vlastnom docker image. Po úspešnom builde a uploade sa dokumentácia
nachádza na stránke <https://team05-19.studenti.fiit.stuba.sk/docs/projekt>
v priečinku príslušnej git branche.

## Docker image
Obraz sa builduje pomocou `docker build` zo súboru `CI/image-docs/Dockerfile`.
Obraz obsahuje predinštalovaný `python3`, `openssh-client` a `rsync` pre upload cez ssh,
`mkdocs`, mkdocs tému a niekoľko mkdocs pluginov.

##  `before_script`
- import SSH klúčov
- nastavenie kódovania

## `prepare` stage
- sťahovanie code snippetov z ostatných repozitárov pomocou [doc-extra/artifact-download.py](gitlab_images/doc_extra.md)
- kontrola platnosti linkov v rámci dokumentácie, teda aby všetky linky smerujúce
  na iný dokument boli relatívne a smerovali na .md súbor, nie priečinok.
  Existenciu samotného .md súboru kontroluje mkdocs, pokiaľ má link príponu .md

## `build` stage
- odstránenie šablón z dokumentácie
- vygenerovanie HTML dokumentácie do priečinka `site`
- job `build pdf`
    - nastaví premennú prostredia `ENABLE_PDF_EXPORT`
    - vykoná všetko ako v `build` a tým vygeneruje aj PDF
    - tento job sa spúšťa iba manuálne

## `deploy` stage
- obsah priečinka `site` sa uploaduje na vzdialený server
