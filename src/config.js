/**
 * JEDYNE MIEJSCE KONFIGURACJI SPRZEDAŻY.
 * Ten plik jest publiczny. Nie wpisuj tu kluczy API ani haseł.
 * Pełny PDF wgraj WYŁĄCZNIE do Naffy / Easycart (nigdy do public/).
 */
export const salesConfig = {
  // Wklej pełny link HTTPS do produktu/koszyka Naffy lub Easycart.
  checkoutUrl: '',
  // Końcowa cena brutto w PLN, zgodna z koszykiem; np. liczba, bez cudzysłowów.
  pricePLN: null,
  // Uzupełnij zgodnie z rzeczywistą konfiguracją dostawy na platformie.
  deliveryDescription: '',
  // Włącz dopiero po uzupełnieniu danych, dokumentów i sprawdzeniu dostawy.
  salesEnabled: false,
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

export function isSalesReady(config = salesConfig) {
  return config.salesEnabled === true && isHttpsUrl(config.checkoutUrl)
    && Number.isFinite(config.pricePLN) && config.pricePLN > 0
    && Boolean(config.deliveryDescription.trim())
    && Boolean(config.seller.name.trim()) && Boolean(config.seller.address.trim())
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.seller.email)
    && ['termsUrl', 'privacyUrl', 'consumerRightsUrl'].every((key) => isHttpsUrl(config.legal[key]));
}
