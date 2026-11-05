# Na luźnej smyczy

Polskojęzyczny landing page jednego e-booka PDF. Vite + semantyczny HTML + CSS + JavaScript, bez frameworka, śledzenia i zewnętrznych skryptów. Grafiki i fonty są lokalne.

## Uruchomienie

Wymagane Node.js 24 i npm 11 (wersja Node w `.nvmrc`).

```sh
cd /workspace/testowe
npm ci
npm run dev
```

Podgląd deweloperski: port **5173** (host `0.0.0.0`). Produkcyjnie:

```sh
npm run check
npm run build
npm run preview
```

Podgląd zbudowanej wersji: port **4173**. Projekt można wdrożyć na Netlify: połącz repozytorium, użyj polecenia `npm run build` i katalogu publikacji `dist`. Gotowa konfiguracja jest w `netlify.toml`. Na innym hostingu statycznym opublikuj wyłącznie `dist/`, nie całe repozytorium ani `/workspace`.

## Konfiguracja sprzedaży — `src/config.js`

Cena wynosi **39,99 zł**. Wszystkie trzy przyciski zakupu prowadzą do adresu Naffy wskazanego w `salesConfig.checkoutUrl`, w tej samej karcie. Zakup, płatność i udostępnienie produktu obsługuje Naffy; landing page nie ma własnego koszyka ani formularza zamówienia.

- Zmieniaj adres zakupu wyłącznie w `salesConfig.checkoutUrl`, a cenę w `salesConfig.pricePLN`.
- Vite wstawia te wartości do HTML podczas budowania i podczas pracy serwera deweloperskiego. Linki i cena działają również bez JavaScriptu. Po zmianie konfiguracji przebuduj projekt; przy działającym serwerze deweloperskim uruchom go ponownie.
- `deliveryDescription` zawiera informację odsyłającą do warunków dostępu przedstawionych w Naffy; nie deklaruje niepotwierdzonego terminu ani kanału dostawy.
- Opcjonalne pola `seller` i `legal` pozwalają podać własne dane kontaktowe oraz adresy dokumentów. Gdy ich nie podano, odpowiednie okna kierują do informacji w procesie zakupu przez Naffy i nie wymyślają danych ani warunków prawnych.
- Cena w konfiguracji strony powinna odpowiadać cenie w Naffy. Przed zmianą oferty sprawdź też konfigurację produktu i dostawy na platformie.
- Pełny e-book wgrywaj wyłącznie do zabezpieczonej dostawy Naffy. Nie dodawaj go do repozytorium ani `public/`.

Nie wpisuj kluczy API, tokenów ani haseł do konfiguracji. Integracja jest zwykłym przekierowaniem na platformę; strona nie potrzebuje sekretów płatniczych, backendu ani własnego webhooka.

## Materiały publiczne

- `public/images/`: mockup, dwie ilustracje i wybrane strony **2, 7, 14**.
- `public/na-luznej-smyczy-fragment.pdf`: dokładnie **3 wybrane strony**, bez pełnego produktu.
- Pełnego PDF nie ma w repozytorium ani w `dist`.

Nie dodawaj całego e-booka do `public`, `src`, plików wdrożenia ani GitHuba — nawet pod nietypową nazwą. Hosting statyczny nie jest miejscem do kontrolowanej dostawy płatnego produktu. `dist` powstaje wyłącznie z plików tej strony; źródłowy PDF przechowano poza checkoutem.

## Dokumentacja

- `docs/ANALIZA-PRODUKTU.md`: odbiorca, problem, rzeczywiste korzyści, materiały, granice poradnika.
- `docs/PROJEKT.md`: system wizualny i świadome dostosowania koncepcji.

Przed publikacją uzupełnij również docelowy adres i absolutny URL grafiki Open Graph w metadanych, jeśli potrzebujesz podglądu przy udostępnianiu. Nie wpisano fikcyjnej domeny ani autora.

## GitHub → automatyczne wdrożenia Netlify

Repozytorium projektu: https://github.com/brokenheartsclubnewbrand-hue/testowe

Jednorazowe połączenie w panelu Netlify:

1. Wybierz **Add new project → Import an existing project → GitHub** (nazwy mogą się nieznacznie różnić).
2. Zezwól aplikacji Netlify na dostęp do repozytorium `brokenheartsclubnewbrand-hue/testowe` i wybierz je.
3. Ustaw gałąź produkcyjną **main**, katalog bazowy pozostaw pusty. Polecenie budowania **npm run build**, katalog publikacji **dist** i Node.js **24** są zapisane w `netlify.toml`.
4. Uruchom pierwsze wdrożenie i sprawdź stronę pod adresem przydzielonym przez Netlify. Strona nie wymaga sekretów ani zmiennych środowiskowych.
5. Pozostaw włączone automatyczne wdrożenia produkcyjne dla gałęzi `main`.

Kolejne zmiany: Codex pracuje na aktualnym checkoutcie tego repozytorium, zmienia potrzebne pliki, uruchamia `npm run check` i `npm run build`, a następnie zapisuje commit i przesyła go do GitHuba na twoje polecenie. Push do `main` uruchamia nowe wdrożenie Netlify po jednorazowym połączeniu opisanym wyżej. Można też pracować na osobnych gałęziach i scalać pull requesty do `main`; Netlify może wtedy przygotowywać Deploy Previews, jeśli ta funkcja jest włączona.

Nie commituj `node_modules/`, `dist/`, sekretów ani pełnego płatnego PDF. Netlify samodzielnie odtwarza `dist/` ze źródeł i lockfile. Przyciski zakupowe prowadzą do skonfigurowanej oferty Naffy; ustawienia płatności i dostawy utrzymuj na platformie Naffy.
