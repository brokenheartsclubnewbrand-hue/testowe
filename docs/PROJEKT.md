# Kierunek wizualny

Inspiracja: dostarczona referencja z Pinteresta — zielona paleta, duży produkt obok obietnicy, naprzemienne pasma tła, jasna ścieżka do zakupu. Projekt jest autorski, bez kopiowania tematyki, treści, ocen i gwarancji z referencji.

## Koncepcje wygenerowane przed budową

Pliki koncepcji pozostają poza publikowanym projektem:
- `/workspace/generated_images/exec-5699b404-4ab7-4a5e-9cae-637b1b9a61d9.png`: nagłówek, hero, pasmo zasad, początek sekcji problemu.
- `/workspace/generated_images/exec-0f9dda87-27b0-47ba-bbd9-a78555975ccd.png`: problem, plan, zawartość i fragment.
- `/workspace/generated_images/exec-c3c06a2a-7fe0-4cfb-b655-3a8289a0ab5a.png`: odbiorca, oferta, FAQ, stopka.

## System

- Tła: ciepła biel `#faf9f5`, jasna szałwia `#e5eddf`, pasmo oliwkowe `#617247`, oferta ciemnozielona `#173e36`.
- Typografia: Cormorant Garamond dla nagłówków i kursywy, DM Sans dla tekstu i przycisków. Fonty lokalne z polskimi znakami.
- Kontener: do 1304 px, szerokie marginesy desktopowe, 20 px na telefonie.
- Komponenty: otwarte sekcje, cienkie linie, przyciski o promieniu 6 px, listy numerowane, trzy kolumny spisu, podgląd natywnym dialogiem, FAQ w `details`.
- Ikony: drobne kontury o spójnej grubości; smycz jako znak nawigacyjny. Bez dekoracyjnych kafelków i fałszywych oznaczeń bezpieczeństwa.
- Obrazy: bez nałożonego filtra kolorystycznego. Mockup z prawdziwą okładką, dwie ilustracje w jej stylu, autentyczne strony PDF. Nie używamy screenshotów koncepcji jako interfejsu.
- Ruch: krótkie pojawianie przy przewijaniu, subtelne podniesienie przycisków i stron. `prefers-reduced-motion` wyłącza animacje i płynne przewijanie.

## Celowe dostosowania koncepcji

- Jedno wystąpienie głównego nagłówka problemu nad układem ilustracja + objawy; nie powtarzamy go z dwóch sąsiednich koncepcji.
- Podgląd zawiera prawdziwą stronę spisu treści (2), zamiast okładki omyłkowo podpisanej przez generator jako spis treści.
- Zawartość rozszerzona do pełnej rzeczywistej listy zagadnień, bez pomijania kart pracy i źródeł.
- Mockup jest oddzielnym wygenerowanym obrazem z rzeczywistą okładką i przezroczystym tłem, bez podstawki; nie odtwarzamy liści i dodatkowych rekwizytów z koncepcji.
- Pojawia się krótka informacja, że to produkt cyfrowy, a nie fizyczna książka.
- Dostawa, cena, dokumenty i dialog demonstracji są jawne do czasu uzupełnienia danych.
- FAQ ma dodatkowe odpowiedzi o czytniku PDF i braku gwarantowanego terminu zmiany.
- Mobilnie elementy układają się w jedną kolumnę; menu jest rozwijane, a strony można otworzyć w przewijanym dialogu.
