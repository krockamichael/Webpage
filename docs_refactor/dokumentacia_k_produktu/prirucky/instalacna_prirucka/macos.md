# 🍎 MacOS - Unity klient

## Prerekvizity
- [Unity 2018.3.7f1](https://unity3d.com/get-unity/download)
    - Unity je vývojová platforma pre tvorbu real-time 3D aplikácií,
    - Potrebné je stiahnuť a nainštalovať aplikáciu Unity Hub, do ktorého je potom možné pridať požadovanú verziu Unity.  
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
    - Docker je potrebný na spustenie kontajneru s Lua modulmi, najmä pre modul `luaserver`
    - Detaily o inštalácii dockeru je možné nájsť na [tejto](luaserver.md) podstránke
- [Doxygen 1.8.16](http://doxygen.nl/files/Doxygen-1.8.16.dmg)
    - Doxygen je nástroj na generovanie dokumentácie z anotovaného zdrojového kódu aplikácie.
- [Git](https://git-scm.com/download/mac)
    - potrebné je nahrať svoj verejný kľúč na **GitLab**, ale aj **GitHub**
## Postup
### Vygenerovanie ssh kľúča
      - Vygenerujeme ssh kľúč `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`,
      - Spustíme ssh-agent na pozadí `eval "$(ssh-agent -s)"`,
      - Prostredníctvom ľubovoľného textového editora modifikujeme súbor ~/.ssh/config
``` bash
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

   - Pridáme privátny SSH kľúč do ssh-agenta, pokiaľ sa vygenerovaný privátny
     kľúč nachádza v súbore s iným menom, názov *id_rsa* týmto názvom nahradíme
     `ssh-add -K ~/.ssh/id_rsa`,
   - príkazom *pbcopy* skopírujeme verejný kľúč do schránky (clipboard)
     `pbcopy < ~/.ssh/id_rsa.pub`,
   - kľúč potom vložíme do svojho konta na portáloch **GitHub** a **GitLab**.

### Naklonovanie repozitára 3DSoftVis_Remake
    - pokiaľ sme nastavili SSH kľúč, repozitár naklonujeme prostredníctvom SSH
      `git clone git@gitlab.com:FIIT/3DSoftVis_Remake/3dsoftvis_remake.git`
      a prejdeme do adresára `cd 3dsoftvis_remake/`,
    
#### Výber vetvy
     - príkazom `git checkout feature/refactor` vyberieme požadovanú vetvu - v našom
       prípade pracovnú vetvu pre obe platformy
     
#### Inicializácia sub-modulov
     - inicializáciu vykonáme príkazom `git submodule update --init --recursive`,


### Import do Unity
    - spustíme aplikáciu Unity Hub,
    - vyberieme možnosť Add,  
    - vyhľadáme podadresár `3dsoftvis_remake/Projects/3DSoftviz/UnityProject`
    - vyberieme možnosť Open.

### Spustenie projektu
Po kliknutí na Unity projekt sa nám otvorí okno s aplikáciou Unity. V ďalšom kroku treba ešte spustiť Docker kontajner (predpokladáme, že Docker bol nainštalovaný podľa [odporúčanej príručky](luaserver.md)). Je potrebné, aby bola spustená aplikácia Docker Desktop, samotný kontajner potom spustíme z Terminálu príkazom `docker start -i luadev`. Skript, ktorý funguje ako server a čaká na príkazy z Unity, spustíme príkazom `lua luaserver/src/LuaScripts/app/main.lua`. Keď sa skript spustí, môžeme sa prepnúť do aplikácie Unity a kliknúť na tlačidlo Play, ktoré začne zobrazovať graf.