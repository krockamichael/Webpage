# Build system
Build systému je vykonávaný prostredníctvom nástroja `make`, ktorý je známy z prostredia unixových operačných systémov. Ďalšou možnou alternatívou je použitie vývojového prostredia `Visual Studio` pre platformu MS Windows.

Generovanie súborov potrebných pre build je vykonané nástrojom `CMake`, v ktorom je možné špecifikovať, pre ktorý build systém majú byť súbory určené.

Build systém `3DSoftviz_Remake` je zložený z build súborov pre jednotlivé moduly, na vrchole ktorých je build samotnej aplikácie.
Jednotlivé repozitáre obsahujú súbor s názvom `CMakeLists.txt`, ktorý obsahuje postupnosť krokov, ktorá má byť vykonaná. Ide prevažne o vytvorenie `Makefile` súborov, nastavenie premenných prostredia a taktiež nastavenie príznakov pre kompilátor.
V nástroji CMake je možné definovať viaceré závilosti. Najskôr teda dôjde k buildu jednotlivých modulov a až následne C# modulov a Unity.
Všetky potrebné moduly sú nástrojom stiahnuté z GitLab a GitHub repozitárov. V prípade, ak zlyha build niektorého z modulov, zlyhá celý build proces.
