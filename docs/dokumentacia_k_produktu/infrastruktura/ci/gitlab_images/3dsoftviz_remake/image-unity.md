# Unity

Image slúži na zostavenie Unity časti projektu. Image je založený na Ubuntu 18.04 a obsahuje nainštalované závislosti potrebné na zostavenie pre platformy MS Windows, Linux a macOS.

## Závislosti
`libgtk-3-0` - knižnica GUI GTK+

`libglu1-mesa` - pomocná knižnica OpenGL

`libnss3` - knižnice Network Security Systems - obsahuje implementácie kryptografických knižníc pre TLS/SSL a S/MIME

`libasound2` - zdieľaná knižnica pre aplikácie ALSA (Advanced Linux Sound Architecture) - zvuková architektúra pre Linux

`libgconf-2-4` - zdieľané knižnice - systém databázy konfigurácií na ukladanie nastavení aplikácií

`libcap2` - knižnica, ktorá implementuje rozhrania `capabilities` podľa štandardu POSIX 1003.1e, ktoré sú dostupné v linuxovom jadre - umožňujú rozčleniť oprávnenia `root-a` do množín jednotlivých oprávnení

`xvfb` - virtuálny framebuffer - falošný X server

`gconf-service` - podpora služby D-Bus, ktorý používa GConf na prístup ku konfiguračným údajom

`lib32gcc1` - knižnica interných podprogramov, ktoré využíva GCC na prekonanie nedostatkov alebo špeciálnych potrieb konkrétnych strojov

`lib32stdc++6` - GNU C++ knižnica (32-bit verzia)

`libasound2` - knižnica ALSA, jej štandardné zásuvné moduly a konfiguračné súbory

`libc6` - štandardné knižnice - napr. štandardná C knižnica, matematické kižnica a pod.

`libc6-i386` - 32-bitová verzia libc6 pre systémy AMD64

`libcairo2` - 2D vektorová grafická knižnica

`libcups2` - tlačový systém, všeobecná náhrada lpd; podpora Internet Printing Protocol (IPP)

`libdbus-1-3` - knižnica pre systém posielania správ medzi procesmi

`libexpat1` - knižnica jazyka C na syntaktickú analýzu XML

`libfontconfig1` - všeobecná knižnica na konfiguráciu písiem, ktorá nezávisí na X Window System

`libfreetype6` - systém na správu fontov

`libgcc1` - zdieľaná verzia podpornej knižnice vnútorných funkcií, ktoré GCC používa na odstránenie nedostatkov niektorých strojov alebo pre špeciálne potreby niektorých jazykov

`libgdk-pixbuf2.0-0` - knižnica umožňuje načítanie a ukladanie obrázkov, zmenu veľkosti a ukladanie pixbuf, načítanie jednoduchých animácií (GIF)

`libgl1-mesa-glx` - implementácia OpenGL API - GLX Runtime

`libglib2.0-0` - knižnica obsahujúca funkcie jazyka C pre stromy, hashovanie, zoznamy a reťazce

`libgtk2.0-0` - knižnica pre tvorbu GUI

`libnspr4` - knižnica poskytuje platformovo nezávislé možnosti OS (negrafické) - vlákna, synchronizácia vlákien, V/V bežných súborov a siete, časovanie intervalov a čas kalendára, základnú správu pamäte (malloc a free), linkovanie zdieľaných knižníc

`libpango1.0-0` - knižnica pre layoutovanie a renderovanie textu

`libstdc++6` - dodatočné dynamické knižnice pre programy v C++ zostavené kompilátorom GNU

`libx11-6` - balík poskytuje klientské rozhranie k X Window System inak známe ako „Xlib“  
           - poskytuje kompletné API základných funkcií systému okien

`libxcomposite1` - klientské rozhranie X Window System k rozšíreniu protoloku X Composite  
                 - rozšírenie Composite umožňuje klientom zvaným kompozitní správcovia riadiť konečné vykreslenie obrazovky, pričom sa vykonáva do pamäte - mimo obrazovky

`libxcursor1` - knižnica určená na pomoc s nájdením a načítaním kurzorov pre X Window System  
              - kurzory možno načítať zo súborov alebo z pamäte a môžu existovať v niekoľkých veľkostiach  
              - knižnica automaticky vyberie najvhodnejšiu veľkosť  
              - pri použití obrázkov načítaných zo súborov preferuje Xcursor na vykreslenie použitie volania CreateCursor rozšírenia Render

`libxdamage1` - knižnica rozšírenia poškodených oblastí X11  
              - poskytuje klienta X Window System protokolu DAMAGE rozšírenia protokolu X  
              - upozorňuje, keď sa oblasti na obrazovke zmenia („poškodia“)

`libxext6` - knižnica rozličných rozšírení X11 - poskytuje klientské rozhranie X Window System k niekoľkým rozšíreniam protokolu X

`libxfixes3` - rozširujúca knižnica rozličných „opráv“ X11  
             - poskytuje klientské rozhranie X Window System k rozšíreniu protokolu X „XFIXES“  
             - podpora typov regiónov a niektorých funkcií kurzora

`libxi6` - knižnica rozšírenia X11 Input  
         - poskytuje klientské rozhranie X Window System k rozšíreniu XINPUT protokolu X  
         - rozšírenie Input umožňuje nastavenie viacerých vstupných zariadení a hotplugging (pripájanie a odstraňovanie zariadení počas behu)

`libxrandr2` - knižnica rozšírenia X11 RandR  
             - poskytuje klientské rozhranie X Window System k rozšíreniu RandR protokolu X  
             - rozšírenie RandR umožňuje konfiguráciu atribútov obrazovky ako rozlíšenie, otočenie a odraz za behu

`libxrender1` - klientská knižnica X Rendering Extension  
              - X Rendering Extension (Render) používa skladanie digitálneho obrazu ako základ nového vykresľovacieho modelu v rámci X Window System  
              - vykresľovanie geometrických obrazcov sa robí teseláciou na strane klienta na buď trojuholníky, alebo lichobežníky  
              - text sa vykresľuje načítaním grafém na server a vykreslením ich množín  
              - knižnica Xrender sprístupňuje toto rozšírenie X klientom

`libxtst6` - testovanie X11 - knižnica rozšírenia Record  
           - poskytuje klientské rozhranie X Window System rozšírenia X protokolu Record  
           - rozšírenie Record umožňuje X klientom syntetizovať vstupné udalosti, čo je užitočné na automatické testovanie

`zlib1g` - zlib je knižnica implementujúca komprimačnú metódu deflate, používanú v gzip a PKZIP

`debconf` - systém na správu konfigurácie

`npm` - správca balíkov pre javascriptovú platformu Node.js

`libsoup2.4-1` - implementácia knižnice HTTP v C  
               - možňuje aplikáciám GNOME prístup k HTTP serverom na sieti asynchrónnym spôsobom veľmi podobným programovaciemu modelu GTK+ (tiež je podporovaný aj synchrónny režim)
