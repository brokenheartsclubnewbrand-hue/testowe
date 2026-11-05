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

## Włączenie sprzedaży — `src/config.js`

Strona startuje w uczciwym trybie demonstracyjnym. Kliknięcie „Kup teraz” w ofercie otwiera komunikat, a nie pozorną transakcję. Wersja demo nie pobiera danych osobowych ani pieniędzy.

1. Utwórz produkt cyfrowy w Naffy, Easycart lub wybranej platformie obsługującej PDF. **Pełny e-book wgraj tylko do zabezpieczonej dostawy platformy.**
2. Skonfiguruj płatności, końcową cenę brutto, dane sprzedawcy, obsługę zamówień i rzeczywisty sposób automatycznego udostępniania pliku po potwierdzeniu płatności. Nie używaj publicznego URL pełnego PDF.
3. Wklej pełny link HTTPS do koszyka w `salesConfig.checkoutUrl`.
4. Ustaw `pricePLN` jako liczbę odpowiadającą cenie brutto w koszyku. Uzupełnij `deliveryDescription` zgodnie z przetestowaną dostawą.
5. Uzupełnij `seller.name`, `seller.address`, `seller.email` i odpowiednie dane rejestrowe `seller.taxId`.
6. Dodaj adresy HTTPS zatwierdzonego regulaminu, polityki prywatności i informacji o prawach konsumenta w `legal`. Sprawdź, czy dokumenty pasują do rzeczywistego procesu i wybranej platformy; szablon strony nie zawiera gotowych zapisów prawnych.
7. Przeprowadź zakup testowy w trybie testowym platformy: przekierowanie, płatność, potwierdzenie, dostęp do właściwego PDF, kontakt/reklamacja i wymagane zgody dotyczące treści cyfrowych.
8. Dopiero wtedy ustaw `salesEnabled: true`, przebuduj i opublikuj stronę. Wszystkie przyciski zakupu zaczną kierować do koszyka. Bez kompletu wymaganych danych strona pozostaje demonstracją.

**Nie wpisuj kluczy API, tokenów ani haseł do konfiguracji.** Integracja to przekierowanie na platformę; strona nie potrzebuje sekretów płatniczych, backendu ani własnego webhooka.

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
4. Uruchom pierwsze wdrożenie i sprawdź stronę pod adresem przydzielonym przez Netlify. Do samej demonstracji nie są potrzebne sekrety ani zmienne środowiskowe.
5. Pozostaw włączone automatyczne wdrożenia produkcyjne dla gałęzi `main`.

Kolejne zmiany: Codex pracuje na aktualnym checkoutcie tego repozytorium, zmienia potrzebne pliki, uruchamia `npm run check` i `npm run build`, a następnie zapisuje commit i przesyła go do GitHuba na twoje polecenie. Push do `main` uruchamia nowe wdrożenie Netlify po jednorazowym połączeniu opisanym wyżej. Można też pracować na osobnych gałęziach i scalać pull requesty do `main`; Netlify może wtedy przygotowywać Deploy Previews, jeśli ta funkcja jest włączona.

Nie commituj `node_modules/`, `dist/`, sekretów ani pełnego płatnego PDF. Netlify samodzielnie odtwarza `dist/` ze źródeł i lockfile. Integracja z GitHubem nie włącza płatności: konfigurację rzeczywistej sprzedaży wykonaj oddzielnie według instrukcji powyżej.
