# ⛓️ Obmedzovače
##  <font color="red">Zatial nefunguje na refactor scene</font>

Obmedzovač je do scény možné pridať prostredníctvom menu. V ňom sa nachádza sekcia Spawn restriction a v rámci nej už konkrétne typy obmedzovačov. Po zvolení sa daný typ obmedzovača zjaví pri našich rukách.

Čo sa týka gizma, tak v menu je možné nastaviť či sa zobrazuje posúvacie a rotovacie gizmo, škálovacie gizmo alebo sú gizmá vypnuté. Gizmo sa automaticky zobrazí okolo objektu, keď sa k nemu dostatočne blízko priblížime rukou.

## Pohyb alebo rotácia objektom

V prípade, že máme zvolený typ gizma na pohyb alebo rotáciu, po priblížení sa k objektu sa zobrazí okolo neho biely obrys kocky. Keď tento objekt uchopíme, obrys kocky zmení farbu na žltú a vtedy vieme pohybom ruky objektom hýbať alebo ho rotovať.

## Škálovanie objektu

Keď máme zobrazené gizmo pre škálovanie, vidíme okolo neho kocku, na ktorej sú rozmiestnené malé zelené ovládacie kocky. Keď uchopíme rohovú kocku, objekt môžeme zväčšovať po všetkých troch osiach. Vtedy sa zároveň farba konkrétnej zelenej kocky zmení na žltú.

Uchopením prostrednej zelenej kocky na hrane, môžeme škálovať objekt po dvoch osiach. Vtedy zmeníme tvar celkového gizma z kocky na kváder.

Posledným spôsobom škálovania je uchopenie zelenej kocky v prostriedky strany kocky, kedy vieme objekt škálovať po jednej osi. Vtedy kocku taktiež zmeníme na kváder, ktorý akoby naťahujeme.

## Pohyb alebo rotácia celým grafom

Keď sa naše ruky nachádzajú v určitej vzdialenosti od celého grafu, gizmo sa zobrazí okolo. Vtedy môžeme uchopením začať hýbať alebo rotovať celým grafom.

Dôležité je poznamenať, že obmedzovače sú na gizmách pomerne závislé. Keď pridáme do scény obmedzovač, tak jeho veľkosť a polohu meníme práve pomocou gizma.
