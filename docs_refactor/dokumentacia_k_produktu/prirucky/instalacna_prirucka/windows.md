# 🖥️ Windows - Unity klient

### <font color="red">Iba ked bude refaktor samostatne na vetve</font>

### Prerekvizity
- [Visual Studio 2019](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15)
  s nasledovnými komponentmi
    - .net framework v4.7.1
    - Desktop C++ development
    - Visual Studio Tools for Unity
- [Unity editor 2018.3.7f2](https://download.unity3d.com/download_unity/9e14d22a41bb/Windows64EditorInstaller/UnitySetup64-2018.3.7f1.exe?_ga=2.249648837.211372810.1583526895-468966922.1570373423)
- [Doxygen](https://netcologne.dl.sourceforge.net/project/doxygen/rel-1.8.16/doxygen-1.8.16-setup.exe)
- [Git for Windows](https://git-scm.com/download/win)
- vytvorený nezaheslovaný SSH kľúč a nahraný na GitLabe aj GitHube

### Postup
#### Stiahnutie zdrojákov
- vo vhodnom priečinku vykonáme `git clone git@gitlab.com:FIIT/3DSoftVis_Remake/3dsoftvis_remake.git`
- prepneme na develop vetvu `git checkout develop`
- inicializujeme závislosti `git submodule update --init`

#### Spustenie Unity
- otvoríme `3dsoftvis_remake\Projects\3DSoftviz\UnityProject` v Unity
- zmeníme nasledovné a reštartujeme Unity  
  Unity menu > edit > preferences > external tools > editor > VS2019