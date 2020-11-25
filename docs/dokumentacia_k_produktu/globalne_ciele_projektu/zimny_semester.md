# ❄️ Zimný semester
Projekt VizReal je veľký, komplexný projekt, ktorý sa vyvíja už niekoľko rokov, preto bolo počas zimného semestra zo 
začiatku naším cieľom najprv sa s týmto projektom oboznámiť a analyzovať jeho časti. 

V súčasnom stave je projekt postavený na vrstvovej architektúre. Hlavná logická vrstva je implementovaná v prostredi 
Lua a hlavná zobrazovacia vrstva je implementovaná pomocou prostredia Unity engine. Tieto vrstvy komunikujú medzi 
sebou prostredníctvom viacerých vrstiev, ktoré slúžia len na ich komunikáciu. Tie sú implementované v C++ a v C#.  

Chceli by sme odstrániť C++ vrstvu a navrhnúť a implementovať nové komunikačné rozhranie, pomocou ktorého budú tieto 
vrstvy komunikovať. Pripraviť sa na takéto prerábanie architektúry systému a samotné odstránenie vrstvy je ale väčším 
cieľom na zimný semester, ktoré pravdepodobne nestihneme kompletne splniť a bude sa musieť časť z toho presunúť 
do cieľov letného semestra. 