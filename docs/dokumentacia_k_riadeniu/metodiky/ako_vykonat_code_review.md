# Ako vykonať code review

#### Pokyny pre autora
1. Na GitLab repozitári choď do *Merge Requests* v ľavom menu
2. Stlač *New merge request*
3. Nájdi svoju branchu v kolónke *Source Branch*
4. Ako `Target Branch` nastav príslušnú branchu
5. (pre `feature/` a `bugfix/` - `develop`, pre `hotfix/` - `master`)
6. Vyplň *Title* & *Description*, taktiež *Assignee* a *Approvers*
7. Do *Description* pridaj link na dokumentáciu, ktorú si vytvoril ako súčasť práce na US
8. Skontroluj, či zbehol build v karte *Build & Release*. Na schválenie merge requestu je potrebné, aby build prešiel
9. Skontroluj ostatné artefakty z CI (cpplint, doxygen,...)
10. Ak ti recenzent nájde chybu, je ju potrebné opraviť a po opravení napísať ako odpoveď ku komentáru, že chyba je opravená

#### Pokyny pre recenzenta
1. Ak si pridelený na merge request, choď do *Merge Requests* a nájdi názov merge requestu, na ktorý si bol pridelený
2. V karte *Changes* môžeš vidieť zmeny v zdrojovom kóde autora
3. Na chyby sa snaž upozorniť a napísať do komentárov alebo ku riadku kódu.
   Ak sa ti čokoľvek nezdá, tiež to napíš do komentárov alebo ku riadku kódu
4. Po opravení chyby označ komentár ako *Resolved*
5. Po vyriešení všetkých komenárov mergni kód tlačidlom *Merge*
6. Pred tým, ako definitívne mergneš kód, zvoľ `Modify merge commit` a uprav merge
    commit správu. Táto správa bude stručne obsahovať, čo pridáva obsah merge requestu do projektu.

#### Čo je potrebné kontrolovať
1. Statická analýza
    - Vymazal autor niečo, čo nemal?
    - Je kód v súlade s metodikou pre coding conventions?
    - Je kód jasne okomentovaný?
2. Dynamická analýza
    - Je funkcionalita správna?
3. Testy
    - Prešli všetky testy úspešne?
    - Je kód dostatočne pokrytý testami?

[Link na rady pre autora aj recenzenta ohľadom code review](https://github.com/thoughtbot/guides/tree/master/code-review)
