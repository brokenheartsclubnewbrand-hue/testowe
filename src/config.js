/**
 * JEDYNE MIEJSCE KONFIGURACJI SPRZEDAŻY.
 * Ten plik jest publiczny. Nie wpisuj tu kluczy API ani haseł.
 * Pełny PDF wgraj WYŁĄCZNIE do Naffy / Easycart (nigdy do public/).
 */
export const salesConfig = {
  // Wklej pełny link HTTPS do produktu/koszyka Naffy lub Easycart.
  checkoutUrl: 'https://www.naffy.io/acrossflow/praktyczny-ebook-idu',
  // Końcowa cena brutto w PLN, zgodna z koszykiem; np. liczba, bez cudzysłowów.
  pricePLN: 39.99,
  // Bez deklarowania niepotwierdzonego sposobu ani terminu dostawy.
  deliveryDescription: 'Zakup obsługuje Naffy. Informacje o dostępie do pliku znajdziesz w ofercie i podczas składania zamówienia na tej platformie.',
  seller: { name: '', address: '', taxId: '', email: '' },
  // Publiczne adresy HTTPS zatwierdzonych dokumentów (mogą być na platformie).
  legal: { termsUrl: '', privacyUrl: '', consumerRightsUrl: '' },
};

export function isHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch { return false; }
}
