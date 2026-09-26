# 8 Emocji Roberta Plutchika

**Strona:** https://sanefungus.github.io/plutchik-emotions/

Interaktywne koło ośmiu emocji podstawowych Roberta Plutchika, przygotowane jako narzędzie dydaktyczne dla studentów Wydziału Aktorskiego Akademii Teatralnej w Warszawie. Pozwala losować emocje, łączyć je w mieszanki (diady), przeglądać ich sygnały z ciała i poziomy intensywności oraz czytać krótką teorię (Plutchik, James–Lange). Działa po polsku i po angielsku, w trybie jasnym i ciemnym, na telefonie i na komputerze.

---

## Co jest w aplikacji

Aplikacja ma cztery zakładki i jedno okno, które otwiera się po kliknięciu emocji.

| Zakładka | Co robi |
|---|---|
| **Losuj** | Losuje jedną z 8 emocji i pokazuje jej nazwę, opis, *Impuls* i *Działanie*. Losuje „z talii”: żadna emocja nie powtórzy się, dopóki nie wypadną wszystkie osiem. Kliknięcie ikony w kole otwiera kartę emocji od razu na *Słowniku Ciała*. |
| **Diady** | Losuje parę emocji, rysuje dwa nakładające się koła w ich kolorach i podaje nazwę emocji złożonej (np. Radość + Zaufanie = Miłość) oraz jej rodzaj: podstawowa, drugorzędna, trzeciorzędna albo *Konflikt* (emocje przeciwne, które się nie mieszają). |
| **Katalog** | Osiem kart emocji. Każda otwiera okno z pełnym opisem. |
| **Teoria** | Pięć krótkich części: teza (ciało przed uczuciem), kim był Plutchik, spór Stanisławski kontra praca od ciała, pięć rozwijanych „reguł gry” i powrót do ćwiczenia. |

**Karta emocji** (okno) zawiera:
- **Mechanizm powstawania** — łańcuch *Bodziec → Impuls → Emocja → Działanie → Cel biologiczny*. Każdy etap (poza samą Emocją) można dotknąć, żeby rozwinąć wyjaśnienie; przycisk *Dalej* prowadzi do następnego etapu.
- **Skala energii** — trzy natężenia emocji: sygnał, emocja, afekt (np. pogoda ducha → radość → ekstaza).
- **Motoryka** — kierunek ruchu (np. „w górę / na zewnątrz”) i typowe działanie.
- **Słownik Ciała** — osiem sygnałów somatycznych do zbudowania reakcji postaci.
- **Perspektywa aktora** — co czuję w ciele i jakie mam zadanie sceniczne.

Przycisk „wstecz” w telefonie zamyka okno emocji, zamiast wychodzić z aplikacji. Wybrany język i tryb jasny/ciemny przeglądarka zapamiętuje na następną wizytę.

## Linki do wysłania studentom

Adres strony można uzupełnić o zakładkę i kartę emocji:

- `…/plutchik-emotions/#losuj`, `#diady`, `#katalog`, `#teoria` otwierają zakładkę,
- `…/plutchik-emotions/#katalog/gniew` otwiera od razu kartę Gniewu. Nazwy emocji piszemy bez polskich znaków: `radosc`, `zaufanie`, `strach`, `zaskoczenie`, `smutek`, `wstret`, `gniew`, `oczekiwanie`.

Najprościej otworzyć kartę emocji na stronie i skopiować adres z paska przeglądarki.

---

## Gdzie co leży

Najważniejsza zasada: **teksty są oddzielone od wyglądu**. Żeby poprawić treść, zwykle wystarczy jeden plik w `src/tresc/` i nie trzeba dotykać reszty.

### Treść (tu się najczęściej zagląda)

| Chcę zmienić… | Plik |
|---|---|
| opis emocji, łańcuch Bodziec–Impuls–Działanie–Cel, rozwinięcia etapów, skalę natężenia, Słownik Ciała, kolor, ikonę | [src/tresc/emocje.ts](src/tresc/emocje.ts) |
| nazwy diad (co powstaje z której pary) i napisy na plakietkach | [src/tresc/diady.ts](src/tresc/diady.ts) |
| teksty zakładki Teoria | [src/tresc/teoria.ts](src/tresc/teoria.ts) |
| napisy na przyciskach, nagłówki, stopkę, tytuł karty przeglądarki | [src/tresc/interfejs.ts](src/tresc/interfejs.ts) |
| jakie pola musi mieć każda emocja | [src/tresc/typy.ts](src/tresc/typy.ts) |

Każdy tekst występuje dwa razy: `pl: "…"` i `en: "…"`. Zmieniając jedną wersję, warto od razu poprawić drugą. W tekstach Teorii `*gwiazdki*` oznaczają kursywę.

### Wygląd i działanie

| Folder / plik | Co tam jest |
|---|---|
| [src/App.tsx](src/App.tsx) | „Szkielet” aplikacji: nagłówek, przełączniki języka i trybu, pasek zakładek, stopka, losowanie emocji i par, obsługa adresów i przycisku „wstecz”. |
| [src/views/](src/views/) | Po jednym pliku na zakładkę: `ShuffleView` (Losuj), `DyadsView` (Diady), `CatalogView` (Katalog), `TheoryView` (Teoria). |
| [src/components/](src/components/) | Okno emocji (`EmotionModal`) i jego części: łańcuch mechanizmu (`EvoChain`) i skala natężenia (`IntensityLadder`). |
| [src/lib/](src/lib/) | Drobne narzędzia: adresy `#katalog/gniew` (`adres.ts`), zapamiętywanie języka i trybu (`ustawienia.ts`), mieszanie kolorów kół w Diadach (`kolory.ts`), kursywa w tekstach (`tekst.tsx`). |
| [src/index.css](src/index.css) | Animacje (ruletka, pojawianie się) i ustawienie trybu ciemnego. |
| [index.html](index.html) | Tytuł strony i podgląd linku na Messengerze/Teamsie/Facebooku. |

### Pozostałe pliki

| Plik / folder | Co to jest |
|---|---|
| [Mechanizm_Powstawania_Emocji_Teksty_do_modali.md](Mechanizm_Powstawania_Emocji_Teksty_do_modali.md) | Dokument roboczy: teksty rozwinięć etapów łańcucha dla wszystkich 8 emocji. Są już przeniesione do `src/tresc/emocje.ts` — aplikacja czyta tamten plik, nie ten. |
| [Zakladka_Teoria__Propozycja_Przebudowy.md](Zakladka_Teoria__Propozycja_Przebudowy.md) | Dokument roboczy: koncepcja i teksty obecnej zakładki Teoria. Wdrożone w `src/tresc/teoria.ts`. |
| [public/og-image.png](public/og-image.png) | Obrazek pokazywany przy udostępnianiu linku (1200×630). |
| [scripts/og-image.html](scripts/og-image.html) | Źródło tego obrazka; w komentarzu na górze jest polecenie, które go odtwarza zrzutem ekranu z Edge. |
| [.github/workflows/deploy.yml](.github/workflows/deploy.yml) | Automat, który po każdej zmianie na `main` buduje i publikuje stronę. |
| `package.json`, `vite.config.ts`, `tsconfig.json` | Ustawienia narzędzi budujących. Na co dzień nie trzeba ich ruszać. |
| `node_modules/`, `dist/`, `.vite/` | Tworzone automatycznie na komputerze, nie trafiają do repozytorium. |

---

## Jak się tym posługujemy

### Podgląd na własnym komputerze

Potrzebny jest [Node.js](https://nodejs.org/) (wersja 20.19 lub nowsza — tego wymaga Vite 7). Za pierwszym razem, w folderze repozytorium:

```bash
npm install
```

Potem, za każdym razem, gdy chcemy zobaczyć aplikację:

```bash
npm run dev
```

W terminalu pojawi się adres (zwykle `http://localhost:5173`). Po otwarciu go w przeglądarce każda zapisana zmiana w plikach od razu pokazuje się na stronie.

W aplikacji Claude Code podgląd uruchamia się też z gotowej konfiguracji `plutchik` (port 5174), zapisanej lokalnie w `.claude/launch.json`.

### Sprawdzenie, czy strona się zbuduje

```bash
npm run build
```

Tworzy gotową stronę w folderze `dist/` — cała aplikacja mieści się w jednym pliku `dist/index.html`. Jeśli to polecenie kończy się błędem, publikacja na GitHubie też się nie uda. Repozytorium nie ma testów automatycznych, więc poza budowaniem zmianę sprawdzamy, przeklikując ją w przeglądarce (na telefonie i na komputerze, w obu językach i obu trybach).

### Publikacja

Wystarczy wysłać zmiany na gałąź `main` (bezpośrednio albo przez scalenie pull requesta). GitHub sam:

1. instaluje zależności i buduje stronę (`npm ci`, `npm run build`),
2. wrzuca zawartość `dist/` na gałąź `gh-pages`,
3. GitHub Pages serwuje ją pod adresem strony.

Trwa to zwykle 1–2 minuty; postęp widać w zakładce **Actions** repozytorium. Gałęzi `gh-pages` nie edytujemy ręcznie — jest nadpisywana przy każdej publikacji.

### Gałęzie

- `main` — aktualna wersja, z niej publikowana jest strona.
- `gh-pages` — zbudowana strona (tylko dla automatu).
- `6X` — stara gałąź z wcześniejszego etapu prac, niescalona.

---

## Z czego jest zbudowana

React 19 + TypeScript, budowane Vite, style Tailwind CSS v4, ikony `lucide-react`. Wtyczka `vite-plugin-singlefile` skleja całą aplikację w jeden plik HTML. Nie ma serwera ani bazy danych — to strona statyczna.

## Licencja

MIT — zob. [LICENSE](LICENSE).
