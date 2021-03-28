# Luaserver
Modul Luaserver slúži ako komunikačná vrstva na Lua strane. Primárnou úlohou modulu Luaserver je zabezpečenie komunikácie medzi [modulmi](http://team03-20.studenti.fiit.stuba.sk/dokumentacia_k_produktu/architektura_systemu/moduly_systemu/lua/) implementovanými v jazyku Lua a C# vrstvou. Združuje moduly implementované v Lua, aby mohli fungovať samostatne od C# a Unity vrstiev, napríklad aj na vzdialenom serveri. Je rozdelený do viacerých skriptov, pričom hlavný z nich, *main.lua*, obsahuje nekonečnú slučku v ktorej čaká na požiadavky. Mapovanie reťazcov na volania konkrétnych funkcií je uložené v tabuľke a realizujú sa pomocou funkcie [pcall](https://www.lua.org/pil/8.4.html).

##### netHandler
V skripte nedHandler.lua je pomocou knižnice [MessagePack](https://msgpack.org/#json-to-msgpack) implementovaná komunikácia cez port. V súčasnom stave je podporovaná komunikácia iba s jedným klientom naraz, ktorý sa môže napojiť na port 49155. V prípade, že prebieha komunikácia, tak nie je možné nadviazať nové spojenie.

##### core
Skript core.lua vznikol úpravami v originálnom skripte main.lua z predchádzajúceho riešenia, kde bola Lua integrovaná do C# vrstvy pomocou DLL súborov implementovaných v C++. Obsahuje základné funkcie, ktoré sú pomocou implementácie objektu sprístupnené na volanie na základe požiadaviek, ktoré spracúva main.lua.

##### serializer
Serializer je implementovaný ako objekt a obsahuje atribút cjson, na ktorý je naviazaná rovnomenná knižnica cjson. Jej funkcionalita spočíva v `encode` a `decode` funkciách, ktoré transformujú Lua tabuľky (alebo primitívne typy) na string vo formáte JSON a naopak. Vo väčšine prípadov to postačuje, ale ak chceme vytvárať konkrétnejši obsah správ, je potrebné vytvoriť novú funkciu v skripte serializer.lua. Treba brať ohľad aj na fakt, že uzly a hrany grafu v Lua implementácií obsahujú vzájomné prepojenia, tým pádom vznikajú nekonečné cykly z ktorých sa cjson nedokáže dostať. Ďaľším takýmto prípadom je `hypergraphnode` atribút v `node.data`, ktorý odkazuje referencie sám na seba.   

##### Ďalšie skripty
Okrem vyššie menovaných obsahuje modul Luaserver aj ďalšie skripty, v ktorých sú implementované funkcie na obsluhu požiadaviek zo C# vrstvy. Tieto funkcie sprístupňujú funkcionalitu z ďalších Lua modulov ako sú [Luadb](http://team03-20.studenti.fiit.stuba.sk/dokumentacia_k_produktu/funkcionalita_systemu/generovanie_grafu/analyza_luadb/) a [Luametrics](http://team03-20.studenti.fiit.stuba.sk/dokumentacia_k_produktu/funkcionalita_systemu/generovanie_grafu/analyza_luametrics/).