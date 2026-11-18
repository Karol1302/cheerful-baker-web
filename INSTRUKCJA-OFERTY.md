# Oferta i zdjęcie główne

## Przygotowanie produktów

Zdjęcia nowych produktów umieszczaj w osobnych katalogach, na przykład:

```text
public/sets/boze-narodzenie-2026/
  domek-swiateczny/
    01-glowne.jpg
    02-bok.jpg
  choinka-z-gwiazdka/
    01-glowne.jpg
```

Stosuj małe litery, bez polskich znaków i spacji; wyrazy oddzielaj myślnikami. Można używać plików JPG, PNG lub WebP. Dobrze zostawić zapas wokół pierniczka, bo miniatury są przycinane. Obecne zdjęcia w `public/sets` mogą pozostać na swoim miejscu.

Samo umieszczenie zdjęć nie dodaje produktu na stronę. Dane wszystkich widocznych produktów są w `public/sets/sets.json`. Możesz przekazać osobie edytującej stronę nazwę, cenę, opcjonalny podtytuł i opis oraz nazwy zdjęć dla każdego produktu. Wskaż, które zdjęcie ma być główne. Jeśli jakiś plik jest wspólny dla kilku produktów, też można go wskazać.

W kolumnie `tag` w pliku CSV wpisz `pojedynczy` dla pojedynczego pierniczka albo `zestaw` dla zestawu. To przypisanie decyduje o działaniu filtrów oferty.

## Wpis w pliku sets.json

Dodaj kolejny obiekt na końcu tablicy `sets`. Oferta pokazuje najpierw zestawy z polem `setNumber`, od najniższego numeru, a potem pozostałe produkty w odwrotnej kolejności wpisów w pliku, od najnowszych. Na stronie głównej pojawiają się trzy pierwsze zestawy i trzy najnowsze pojedyncze pierniczki. Identyfikatory istniejących produktów pozostają bez zmian. Aby ukryć produkt, usuń jego wpis z tablicy lub przenieś go poza ten plik. Samo usunięcie zdjęcia spowoduje brak obrazu na stronie.

```json
{
  "id": "domek-swiateczny",
  "name": "Domek świąteczny",
  "shortDescription": "Pierniczek dekoracyjny, ok. 9 cm",
  "description": "Ręcznie dekorowany domek świąteczny o wysokości około 9 cm.",
  "thumbnail": "/sets/boze-narodzenie-2026/domek-swiateczny/01-glowne.jpg",
  "price": "19 zł",
  "tag": "pojedynczy",
  "images": [
    {
      "url": "/sets/boze-narodzenie-2026/domek-swiateczny/01-glowne.jpg",
      "description": "Ręcznie dekorowany domek świąteczny"
    },
    {
      "url": "/sets/boze-narodzenie-2026/domek-swiateczny/02-bok.jpg",
      "description": "Domek świąteczny widziany z boku"
    }
  ]
}
```

- `id` musi być unikalne i jest częścią adresu produktu. Dla nowych produktów używaj małych liter, cyfr i myślników. Zmiana istniejącego `id` zmienia jego adres.
- `name` to nazwa, `price` to cena zapisana jako tekst, a `description` to opis na stronie produktu.
- `tag` to `pojedynczy` lub `zestaw` i przypisuje produkt do odpowiedniego filtra.
- `setNumber` to numer zestawu zapisany jako liczba, np. `3`. Dodaj go do ponumerowanych zestawów, używając unikalnego numeru.
- `shortDescription` jest opcjonalny i wyświetla się na liście; bez niego używany jest `description`.
- `thumbnail` wskazuje zdjęcie na listach. Pierwszy obraz z `images` jest dużym zdjęciem produktu; zazwyczaj obie ścieżki wskazują ten sam plik. Każdy produkt musi mieć co najmniej jedno zdjęcie w `images`.
- Opisy zdjęć pomagają opisać ich zawartość osobom korzystającym z czytników ekranu. Wszystkie ścieżki zaczynają się od `/sets/` i muszą dokładnie odpowiadać nazwom plików.
- W JSON kolejne obiekty oddziela się przecinkami, ale po ostatnim elemencie tablicy przecinka nie ma.

## Tytuł oferty

W pliku `src/config/siteConfig.json` zmień wartość `offerTitle`. Ten sam tytuł wyświetli się na stronie głównej i na stronie oferty.

## Zdjęcie hero

Umieść zdjęcie np. w `public/hero/boze-narodzenie-2026.jpg`, a następnie w `src/config/siteConfig.json` zmień pierwszy wpis w `heroSlideshow.images` na `/hero/boze-narodzenie-2026.jpg`. Obecne zdjęcie to `/hero/hero1.jpg`. Strona dopasowuje obraz do całego ekranu i przycina go zależnie od proporcji ekranu; po zmianie sprawdź komputer i telefon. Na obraz nakładana jest jasna warstwa dla czytelności tekstu.

## Sprawdzenie i publikacja

Uruchom `npm run dev`, aby obejrzeć zmiany lokalnie, a przed publikacją `npm run build`. Polecenie `npm run deploy` uruchamia build automatycznie i publikuje katalog `dist` na GitHub Pages. Publikuj dopiero po sprawdzeniu treści, cen i zdjęć.
