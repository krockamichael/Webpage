# Konvencie

Riadky by mali byť maximálne 80-120 znakov dlhé, aby sa ľahšie hľadali zmeny v Gite.

## Konvencie písania kódu pre C\#

#### Konvencie pomenovania
* Konštanty – konštanty by mali byť pomenované na základe PascalCasing bez ohľadu na modifikátor prístupu.
``` C#
private conts int TheUniversalAnswer = 42;
public conts double Pi = 3.14;
```

* Private premenné – mali by začínať podčiarkovníkom a malým písmenom
``` C#
   private int x;
   public static readonly myLock = new Object();
```
* Metódy a Triedy – používať PascalCasing
``` C#
public class ClientActivity
{
    public void ClearStatistic()
    {
        //...
    }
    public void CalculateStatistic()
    {
        //...
    }
}
```
* Argumenty metód a lokálne premenné – používať camelCasing
``` C#
public class UserLog
{
    public void Add(LogEvent logEvent)
    {
        int itemCount = logEvent.Items.Count;
        //...
    }
}
```

* Triedy – používať podstatné mená na pomenovanie tried
``` C#
public class Employee
{
}
public class BussinesLocation
{
}
public class DocumentCollection
{
}
```

* Rozhrania – používať prefix I
``` C#
public interface IShape
{
}
public interface IShapeCollection
{
}
public interface IGroupable
{
}
```
* Nepoužívať bulharské konštanty
* Jednoriadkové príkazy – môžu mať zátvorky, ktoré začínajú a končia na rovnakom riadku  
``` C#
public class Foo
{
    int bar;
    public int Bar()
    {
    get { return bar; }
    set { bar = value; }
    }
}
```
- Curly braces (kučeravé zátvorky)
    * Allman style - vertikálne zarovnanie  
``` C#
if(condition)
{ //this brace should never be omitted
    DoSomething();
}
DoSomethingElse();
```
- Deklarácie
    * Vždy špecifikovať viditeľnosť (public, private, protected)
    * Viditeľnosť by mala byť prvým modifikátorom (public abstract)
    * Členy enum, by mali byť zoradené podľa hodnoty
    * Pri statických poliach kľúčové slovo readonly po static
- Referencie
    * Používať this. na rozoznanie medzi lokálnou a členskou premennou
    * Ak je možné, vždy používať var namiesto špecifických typov
    * Používať kľúčové slová (int, string, float...) namiesto BLC typove
      (String, Int32, Single,...), rovnako pre volania metód (int.Parse nie Int32.Parse)
- Menné priestory
    * Import by mal byť na začiatku súboru, mimo menného priestoru, deklarácie
      by mali byť zoradené abecedne, ale System by mal byť pred všetkými ostatnými
- Organizácia tried – zoradiť v nasledujúcom poradí
    * Konštanty
    * Polia
    * Vlastnosti
    * Udalosti
    * Metódy
    * Vnútorné typy
    * Rovnaké typy by mali byť ďalej zoradené podľa viditeľnosti - public, protected, private
- Komentovanie
    * XML komentáre na dokumentovanie metód, tried a rozhraní (`///<sumary>...</summary>`)
    * Používať single line komentovanie na všeobecné komentovanie (`// ....`)
    * Komentáre umiestnovať na zvlášť riadok, nie na koniec riadku s kódom
    * Necomitovať mŕtvy kód (bez komentárov)
    * Nepoužívať bloky komentárov (`/* ... */`)
- Layout konvencie
    * Jeden príkaz na riadok
    * Jedna deklarácia na riadok
    * Aspoň jeden voľný riadok medzi definíciami metód a definíciami vlastností

## Konvencie písania kódu pre C++

#### Formátovanie

- Zátvorky sú stále na novom riadku
``` C++
//správne
class MyClass
{
   //...
};

//nesprávne
class MyClass{
   //...
};

```

#### Pomenovanie
- Na pomenovanie používame PascalCase
- Typy - názvy začínajú veľkým písmenom

``` C++
class MyClass: public MyParent
{
    //...
};
```

- Funkcie - názvy začínajú malým písmenom  
``` C++
void myFuncion(int a);
```

- Konštanty - celé veľkými písmenami, slová sú oddelené podčiarnikom _  
``` C++
const int ANSWER_TO_EVERYTHING = 42;
```

- Premenné - názvy začínajú malým písmenom, nepoužívame prefix \_, m\_ pre private/protected premenné  
``` C++
int myVariable = 42;
```

#### Správne programovanie

- Uprednostňujeme referencie pred ukazovateľmi
- Snažíme sa zabrániť zbytočnému kopírovaniu dátových štruktúr  
``` C++
//správne
//Poznámka: Pre návratovú hodnotu bude spravená RVO (Return Value Optiomalization)
std::string toLowercase(const std::string& str)
{
    std::string result;
    //...
    return result;
}
//nesprávne
std::string toLowercase(const std::string str)
{
    std::string result;
    //...
    return result;
}
```

#### POUŽÍVAME

- `nullptr` namiesto `NULL`
- `#include guards` namiesto `#pragma once`
- forward deklarácie všade, kde je to možné
- `const` všade, kde je to možné (funkcie, premenné, ukazovatele)
- lambda funkcie namiesto function objects všade, kde je to možné

#### NEPOUŽÍVAME

- `using namespace` v header súboroch
- `using namespace std;`
- makrá, ak to nie je úplne nevyhnutné
