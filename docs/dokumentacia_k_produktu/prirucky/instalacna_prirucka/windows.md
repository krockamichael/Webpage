# 🖥️ Windows

## Prerekvizity
- [Visual Studio 2019](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15)
  s nasledovnými komponentmi
    - .net framework v4.7.1
    - Desktop C++ development
    - Visual Studio Tools for Unity
- [Unity editor 2018.3.7f2](https://download.unity3d.com/download_unity/9e14d22a41bb/Windows64EditorInstaller/UnitySetup64-2018.3.7f1.exe?_ga=2.249648837.211372810.1583526895-468966922.1570373423)
- [Cmake](https://github.com/Kitware/CMake/releases/download/v3.15.4/cmake-3.15.4-win64-x64.msi)
- [Doxygen](https://netcologne.dl.sourceforge.net/project/doxygen/rel-1.8.16/doxygen-1.8.16-setup.exe)
- [Git for Windows](https://git-scm.com/download/win)
- vytvorený nezaheslovaný SSH kľúč a nahraný na GitLabe aj GitHube

## Postup
### Stiahnutie zdrojákov
- vo vhodnom priečinku vykonáme `git clone git@gitlab.com:FIIT/3DSoftVis_Remake/3dsoftvis_remake.git`
- prepneme na develop vetvu `git checkout develop`
- inicializujeme závislosti `git submodule update --init`

### Kofigurácia build systému
- otvoríme CMake
    - ako `source code` zvolíme priečinok `3dsoftvis_remake`
    - ako `build binaries` vytvoríme a zvolíme `3dsoftvis_remake_build`
    - klik na configure
    - v prvotnej konfiguracii vyberieme
        - generátor Visual Studio 2019
        - architektúru x64
        - zaškrtneme `build_unity` a `use_terra`
    - v niektorých prípadoch je potrebné nakonfigurovať `unity_executable` ako cestu k `unity.exe`
    - klik na generate

### Vytvorenie premenej prostredia `INCLUDE_PATH`
- otvoríme vlastnosti počítača > rozšírené nastavenia > premenné prostredia > nová
- názov `INCLUDE_PATH`
- v hodnote skontrolujeme a prispôsobíme verzie v cestách
- pre prehladnosť uvádzame hodnotu rozdelenú na riadky,
  ale pred použitím ju je potrebné spojiť do jedného riadka bez medzier

```
C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Tools\MSVC\14.24.28314\include;
C:\Program Files (x86)\Windows Kits\10\Include\10.0.17763.0\ucrt;
C:\Program Files (x86)\Windows Kits\10\Include\10.0.17763.0\um;
C:\Program Files (x86)\Windows Kits\10\Include\10.0.17763.0\shared;
C:\Program Files (x86)\Windows Kits\10\Include\10.0.17763.0\winrt;
C:\Program Files (x86)\Windows Kits\10\Include\10.0.17763.0\cppwinrt
```

### Build závislostí
- otvoríme solution `3dsoftvis_remake_build\3DSoftviz.sln` vo Visual Studio
- klik pravým na CopyExternalDataToUnity > build

### Spustenie Unity
- otvoríme `3dsoftvis_remake\Projects\3DSoftviz\UnityProject` v Unity
- zmeníme nasledovné a reštartujeme Unity  
  Unity menu > edit > preferences > external tools > editor > VS2019


### Časté problémy
- `error CS1704: An assembly with the same simple name 'SyntaxTree.VisualStudio.Unity.Bridge' has already been imported.`  
  táto chyba by sa mala vyskytovať len pri použití VS2019  
  pre jej odstránenie vymažte celý priečinok `Projects\3DSoftviz\UnityProject\Assets\UnityVS`

- pri použití VS2017 býva opačný problém, "SyntaxTree" asset je potrebné importovať  
  v Unity importujeme Asset `Visual Studio 2017 Tools.unitypackage` z `Program Files (x86)/Microsoft Visual Studio Tools for Unity`

- cmake nevie vygenerovať projekt, ak je na počítači viacero verzií Visual Studia
  a zvolí sa taká, ktorá nemá komponent Desktop C++ development 
  
- ak pri kroku [Build závislostí](#build-zvislost) neprebehnú všetky buildy úspešne 
(28 suceeded) a buildy, ktoré zlyhali hlásia zablokovaný prístup k repozitáru, je 
pravdepodobné že máte vytvorený zaheslovaný SSH kľúč alebo ho máte nesprávne nahodený 
na gitlabe/githube. Treba si vytvoriť buď nový nezaheslovaný SSH kľúč a spustiť 
príkazy `ssh git@gitlab.com` a `ssh git@github.com`, ktoré by Vám mali dať nasledujúci 
výstup: 

    `Welcome to GitLab, @username!`   
    `Hi username! You've successfully authenticated, but GitHub does not provide shell access.`

Problémy častejšie evidujeme aj v skupinovom [OneNote](https://stubask.sharepoint.com/sites/Timovy_Projekt_FIIT/_layouts/OneNote.aspx?id=%2Fsites%2FTimovy_Projekt_FIIT%2FSiteAssets%2FTimovy_Projekt_FIIT%20Notebook&wd=target%28Probl%C3%A9my.one%7C411D8B23-A238-4877-BEE9-3B2C5491CC30%2F%29), prístupný po pridaní do MS Teams
