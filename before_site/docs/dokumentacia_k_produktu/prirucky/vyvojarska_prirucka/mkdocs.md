# Lokálny mkdocs
Táto príručka slúži pre vývojárov, ktorí píšu dokumentáciu. Mkdocs je možné
nainštalovať na svojom počítači a okamžite vidieť ako vyzerá písaná dokumentácia.

Viac o MkDocs [tu](../../infrastruktura/podporne_nastroje/mkdocs.md).

## Inštalácia
Mkdocs je napísaný v jazyku python, preto je potrebné ho mať nainštalovaný.
Odporúčame verziu 3.6 alebo 3.7, stiahnutý zo stránky [python.org](https://www.python.org/downloads/).
V čase písania (marec 2020) pod verziou 3.8 nefunguje z dôvodu bugu.

Následne nainštalujeme samotný mkdocs a závislosti.
``` bash
pip3 install mkdocs mkdocs-material mkdocs-awesome-pages-plugin pygments mkdocs-pdf-export-plugin
pip3 install weasyprint
```
Balík `weasyprint` je obvykle nutné inštalovať zvlášt prípadne na dva krát,
pretože sa nenainštaluje korektne.

!!! warning "Verzie"
    Je potrebné inštalovať verziu mkdocs 1.0.4 kvôli nepodpore slovenského vyhľadávania v novej verzii  
	`pip3 install mkdocs==1.0.4 mkdocs-material==4.5.0 mkdocs-awesome-pages-plugin==2.1.0 pygments==2.4.2 mkdocs-pdf-export-plugin==0.5.5`

## Nastavenie
Do vhodného priečinka naklonujeme repozitár
`git clone git@gitlab.com:FIIT/3DSoftVis_Remake/documentation.git`.
Následne je možné v `documentation` priečinku spustiť príkaz `mkdocs serve`
a otvoriť v prehliadači adresu [localhost:8000](http://localhost:8000/).

Pred commitom a pushnutím zmien spustíme príkaz `mkdocs build --strict`,
ktorý upozorní na nefunkčné linky a podobné problémy, ktoré by zabránili
generovaniu dokumentácie v pipeline.
