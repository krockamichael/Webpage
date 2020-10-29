# 🍎 MacOS

## Prerekvizity
- [Mono 6.4.0](https://download.mono-project.com/archive/6.4.0/macos-10-universal/MonoFramework-MDK-6.4.0.198.macos10.xamarin.universal.pkg)
    - Mono predstavuje open source implementáciu Microsoft .NET Framework.
- [CMake 3.15.4](https://github.com/Kitware/CMake/releases/download/v3.15.4/cmake-3.15.4-Darwin-x86_64.dmg)
    - CMake je nástroj na správu procesu zostavovania softvéru, podporuje adresárovú hierarchiu a viacnásobné závislosti.  
- [Doxygen 1.8.16](http://doxygen.nl/files/Doxygen-1.8.16.dmg)
    - Doxygen je nástroj na generovanie dokumentácie z anotovaného zdrojového kódu aplikácie.
- [Unity 2018.1.9f2](https://unity3d.com/get-unity/download)
    - Unity je vývojová platforma pre tvorbu real-time 3D aplikácií,
    - Potrebné je stiahnuť a nainštalovať aplikáciu Unity Hub, do ktorého je potom možné pridať požadovanú verziu Unity.  
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

     - príkazom `git checkout zemko-us-42` vyberieme požadovanú vetvu - v našom
       prípade pracovnú vetvu pre platformu macOS
     
#### Inicializácia sub-modulov

     - inicializáciu vykonáme príkazom `git submodule update --init --recursive`,

### Konfigurácia CMake

    - otvoríme program CMake,
    - ako `source code` zvolíme priečinok `3dsoftvis_remake`,
    - ako `build binaries` zvolíme priečinok `3dsoftvis_remake/_build`,
    - stlačíme tlačidlo configure,
    - ako generátor použijeme `Unix Makefiles` a vyberieme možnosť `Use default native compilers`,
    - vyberieme možnosti `BUILD_DOXYGEN_DOCUMENTATION`, `BUILD_SOFTVIZ_MODULES_TESTS`, `BUILD_UNITY`, `USE_TERRA_BINARIES`,
    - ako `CMAKE_INSTALL_PREFIX` zvolíme priečinok `3dsoftvis_remake/_install`,
    - stlačíme tlačidlo configure,
    - ako `UNITY EXECUTABLE` nastavíme cestu k `Unity.app`,
    - ako `UNITY_TARGET_PLATFORM` zvolíme MacOS,
    - stlačíme tlačidlo generate
    
### Build

    - v príkazovom riadku prejdeme do adresára `3dsoftvis_remake/_build`,
    - build vykonáme príkazom `make CopyExternalDataToUnity`,

### Import do Unity

    - spustíme aplikáciu Unity Hub,
    - vyberieme možnosť Add,  
    - vyhľadáme podadresár `3dsoftvis_remake/Projects/3DSoftviz/UnityProject`
    - vyberieme možnosť Open.

### Testy

    - testy pre C# moduly - SoftvisModules - je možné zostaviť príkazom
      `make SoftvizModulesTests` z adresára `3dsoftvis_remake/_build`,
    - testy sa potom nachádzajú v adresári `3dsoftvis_remake/_install/SoftvizModules.Tests`,
    - prejdeme do adresára `3dsoftvis_remake/Projects/3DSoftviz/CSProjects/`,
    - spustíme príkaz `nuget restore . `, ktorý nainštaluje závislosti potrebné pre spúšťanie testov,
    - prejdeme do adresára `packages/NUnit.ConsoleRunner.3.9.0/tools/`,
    - následne je možné testy spustiť príkazom `mono nunit3-console.exe ../../../../../../_install/SoftvizModules.Tests/*.dll`
    
## Problémy
- **Terra**

     - v projekte sa využíva nadstavba nad jazykom Lua - Terra (pre layouter v Unity vrstve),
     - použitá implementácia Terra v sebe zahŕňa Lua kompilátor, ktorý má na platforme macOS problém s alokáciou pamäti,
     - namiesto Terra je momentálne použitý nástroj Luapower, resp. LuaJIT,
       ktorý problém s alokáciou pamäti nemá, problémom je však implementácia Terra,
       nakoľko obsahuje bug, ktorý momentálne neumožňuje možnosti nadstavby Terra využiť.
  
- **Unity**

     - pri snahe o spustenie projektu aplikácia vypíše chybové hlásenie `DllNotFoundException: luainterface`,
     - problém môže spôsobovať Terra, nakoľko ju využíva layouter,
     - ďalším problémom môže byť nastavenie ciest
  
- **Testy**

     - po zmenách CMakeLists.txt súborov a použití implementácie Luapower
       sú uspešne vykonané všetky testy zamerané na modul LuaInterface
     - pri testoch Lua.Common.Tests je úspešne vykonaná väčšina testov,
       neúspešne sú vykonané 2 testy zamerané na modul LuaGraph -
       GraphObjectRawDataAreLoadedCorrectly a LuaGraphLoadsMockedLuaGraphCorrectly,
     - testy GraphCore.Tests sú neúspešné všetky,
     - chyba vzniká pri volaní konštruktora modulu LuaGraph.
