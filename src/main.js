import './styles.css';
import { salesConfig, isSalesReady, isHttpsUrl } from './config.js';

const $ = (selector) => document.querySelector(selector);
const menu = $('#navigation');
const menuToggle = $('.menu-toggle');
const closeMenu = () => {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Otwórz menu');
};
menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu(); menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width:701px)').addEventListener('change', closeMenu);

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer;
function configureMotion() {
  observer?.disconnect();
  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    document.documentElement.classList.remove('js-motion');
    return;
  }
  document.documentElement.classList.add('js-motion');
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
configureMotion();
motionPreference.addEventListener('change', configureMotion);

// Natywne dialogi: obsługa klawiatury, focus trap i powrót do przycisku otwierającego.
const infoDialog = $('#info-dialog');
const previewDialog = $('#preview-dialog');
function openDialog(dialog) {
  closeMenu();
  document.body.classList.add('modal-open');
  dialog.showModal();
}
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
function showInfo(title, paragraphs, sample = false) {
  $('#dialog-title').textContent = title;
  $('#dialog-content').replaceChildren(...paragraphs.map((text) => {
    const p = document.createElement('p'); p.textContent = text; return p;
  }));
  $('#dialog-sample').hidden = !sample;
  openDialog(infoDialog);
}

const pages = [
  { number: 2, title: 'Spis treści', src: '/images/strona-2.webp' },
  { number: 7, title: 'Co zrobić, gdy smycz się napina', src: '/images/strona-7.webp' },
  { number: 14, title: 'Dziennik spacerów', src: '/images/strona-14.webp' },
];
let currentPage = 0;
function renderPage() {
  const page = pages[currentPage];
  $('#preview-image').src = page.src;
  $('#preview-image').alt = `Strona ${page.number} e-booka — ${page.title}`;
  $('#preview-dialog-title').textContent = `${page.title} · strona ${page.number}`;
  $('#preview-counter').textContent = `${currentPage + 1} z ${pages.length} stron fragmentu`;
  const focusedControl = document.activeElement;
  $('.preview-prev').disabled = currentPage === 0;
  $('.preview-next').disabled = currentPage === pages.length - 1;
  if (previewDialog.open && focusedControl?.matches('button:disabled')) {
    (currentPage === 0 ? $('.preview-next') : $('.preview-prev')).focus();
  }
  $('.preview-scroll').scrollTop = 0;
}
document.querySelectorAll('[data-preview]').forEach((button) => button.addEventListener('click', () => {
  currentPage = Number(button.dataset.preview); renderPage(); openDialog(previewDialog);
}));
function movePage(direction) {
  const next = Math.max(0, Math.min(pages.length - 1, currentPage + direction));
  if (next !== currentPage) { currentPage = next; renderPage(); }
}
$('.preview-prev').addEventListener('click', () => movePage(-1));
$('.preview-next').addEventListener('click', () => movePage(1));
document.addEventListener('keydown', (event) => {
  if (!previewDialog.open) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); movePage(event.key === 'ArrowLeft' ? -1 : 1);
  }
});

const ready = isSalesReady();
if (ready) {
  $('#price-label').textContent = 'Cena brutto · zakup jednorazowy';
  $('#price-value').textContent = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(salesConfig.pricePLN);
  document.querySelectorAll('[data-buy-link]').forEach((link) => { link.href = salesConfig.checkoutUrl; });
  $('#sale-status span').textContent = 'Przejdziesz do bezpiecznej płatności na platformie sprzedażowej.';
  $('#delivery-note').textContent = salesConfig.deliveryDescription;
  $('#delivery-faq').textContent = salesConfig.deliveryDescription;
  $('#footer-status').textContent = `Sprzedawca: ${salesConfig.seller.name}`;
}
$('#purchase-button').addEventListener('click', () => {
  if (ready) { window.location.assign(salesConfig.checkoutUrl); return; }
  showInfo('To jeszcze wersja demonstracyjna.', [
    'Zakupy i płatności nie są aktywne. Nie pobierzemy pieniędzy ani danych zamówienia.',
    'Przed uruchomieniem sprzedaży trzeba uzupełnić cenę, dane i dokumenty sprzedawcy oraz podłączyć koszyk z dostawą PDF. Teraz możesz obejrzeć i pobrać bezpłatny, trzystronicowy fragment.',
  ], true);
});

const legalMessages = {
  seller: ['Dane sprzedawcy', [
    `Nazwa sprzedawcy: ${salesConfig.seller.name || '[do uzupełnienia]'}`,
    `Adres: ${salesConfig.seller.address || '[do uzupełnienia]'}`,
    `NIP / dane rejestrowe, jeśli dotyczą sprzedawcy: ${salesConfig.seller.taxId || '[do uzupełnienia]'}`,
  ]],
  contact: ['Kontakt', [salesConfig.seller.email ? `Adres e-mail sprzedawcy: ${salesConfig.seller.email}` : 'Adres e-mail do kontaktu i obsługi zamówień: [do uzupełnienia przez sprzedawcę].']],
  terms: ['Regulamin — do uzupełnienia', ['Sprzedawca nie dostarczył jeszcze regulaminu sprzedaży. Dokument musi opisywać rzeczywiste zasady zamawiania, płatności, dostarczania treści cyfrowych i reklamacji. Sprzedaż w tej wersji nie jest aktywna.']],
  privacy: ['Prywatność — do uzupełnienia', ['Sprzedawca nie dostarczył jeszcze polityki prywatności. Przed uruchomieniem sprzedaży trzeba wskazać administratora danych i rzeczywiste zasady ich przetwarzania, w tym przez wybraną platformę płatności i hosting. Ta demonstracja nie zawiera formularzy, analityki ani marketingowych plików cookie.']],
  consumer: ['Prawa konsumenta — do uzupełnienia', ['Informacje o prawach konsumenta wymagają przygotowania przez sprzedawcę dla rzeczywistego procesu sprzedaży treści cyfrowych, w tym zasad reklamacji i odstąpienia od umowy. Nie podano jeszcze tych warunków. Nie przyjmujemy obecnie zamówień.']],
};
const legalUrlKey = { terms: 'termsUrl', privacy: 'privacyUrl', consumer: 'consumerRightsUrl' };
document.querySelectorAll('[data-legal]').forEach((element) => {
  const key = element.dataset.legal;
  const url = salesConfig.legal[legalUrlKey[key]];
  if (isHttpsUrl(url)) { element.href = url; return; }
  element.addEventListener('click', (event) => { event.preventDefault(); showInfo(...legalMessages[key]); });
});
