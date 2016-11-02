# WS Projekat


<h1>Ticketing system</h1>
Implementirati sistem za kreiranje taskova unutar projekta. Tiketing sistem se instancira na
nivou kompanije. Sistem može da ima više administratora koji kreiraju projekte/timove. Svaki tim
se sastoji od nekoliko programera. Svi korisnici sistema imaju pravo da kreiraju taskove na
projektu na koji su dodeljeni. Sledi detaljan opis zahteva za sve činioce sistema.

<h3>Admin korisnik</h3>
* Mogućnost kreiranja projekta i dodavanje/brisanje registrovanih korisnika za projekte
* Pregled, kreiranje, brisanje i promena statusa svim zadacima na projektu
* Komentarisanje zadataka, kao i brisanje/izmena svih komentara

<h3>Korisnik</h3>
* Pregled projekata na kojima je angažovan
* Pregled, kreiranje i promena statusa svim zadacima na projektu
* Registracija na sistem
* Filtriranje dodeljenih tiketa na osnovu statusa i prioritetu zadatka
* Komentarisanje zadataka, kao i brisanje/izmena svojih komentara

<h3>Dashboard</h3>
Dashboard stranica predstavlja početnu stranicu koja će biti prikazana svim korisnicima nakon
logovanja. Dashboard stranica treba da sadrži widget-e koji predstavljaju filtrirni sadržaj
zadataka na osnovu prioriteta (npr sve zadatke In progress i Verify, ili sve to do zadatke).

<h3>Zadatak</h3>
Svakom novom zadatku se automatski dodeljuje jedinstvenu oznaku, koji sadrži oznaku
projekta i redni broj kreiranog zadatka na tom projektu npr XWS-1, XWS-2. Pored oznake,
zadatak sadrži i naslov, opis samog zadatka, ime korisnika koji je kreirao zadatak, kao i ime
korisnika kome je zadatak dodeljen (inicijalno zadatak ne mora biti dodeljen nijednom članu
tima). Postojećim zadacima se mogu dodeliti komentari, gde svaki komentar treba da ima
podatke o autoru, tekst komentara kao i vreme kada je objavljen.

<h3>Izmena zadataka (historizacija)</h3>
Svi korisnici mogu da menjaju sadržaj zadatka (opis, naslov, status itd.). Potrebno je beležiti
svaku promenu zadatka i prikazivati je hronološki od najstarije ka novijim.

<h4>Prioriteti</h4>
Zadatka sortirani po stepenu prioriteta:
*Blocker - Blokira dalji razvoj ili testiranje aplikacije, aplikacija ne može da se pokrene
*Critical - Aplikacija nije stabilna, dolazi do gubitaka podataka ili ozbiljna curenja
memorije
*Major - Veliki nedostaci u funkcionalnostima
*Minor - Manji nedostaci u funkcionalnostima ili problemi koji se jednostavno mogu
zaobići
*Trivial - Problemi “kozmetičke” prirode, kao što su slovne greške

<h4>Status zadatka:</h4>
* To Do - zadatak je kreiran, ali jos nije počela njegova implementacija
* In Progress - implementacija zadatka je u toku
* Verify - Implementacija je završena i čeka se da ostali clanovi tima verifikuju
implementaciju
* Done - Implementacija i verifikacija su uspešno završene

<h3>Izveštaji</h3>
Administratori sistema mogu da generišu izveštaje koji opisuju projekat. Izveštaje prikazivati na
stranici kao dijagrame/histograme. Format u kom će biti prikazani izveštaju prepušta se
studentima.

<h4>Tipovi izveštaja:</h4>
* Zadaci dodeljeni korisnicima - za odabrani projekat se prikazuje koliko procenata
zadataka je svakom korisniku dodeljeno
* Završeni zadaci - za odabrani projekat se prikazuje koliko procenata zadataka je koji
korisnik završio
* Dinamika kreiranja zadataka na projektu - za odabrani projekta se na vremenskoj liniji
prikazuje koliko zadatak je u kom momentu kreirano
* Dinamika završavanja zadataka na projektu - za odabrani projekta se na vremenskoj
liniji prikazuje koliko zadatak je u kom momentu završeno
* Aktivnost korisnika na projektu - na vremenskoj liniji se prikazuje koliko zadataka je u
kom momentu korisnik završio

proba
