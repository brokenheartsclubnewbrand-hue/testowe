import './styles.css';
import { salesConfig, isHttpsUrl } from './config.js';

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
function showInfo(title, paragraphs) {
  $('#dialog-title').textContent = title;
  $('#dialog-content').replaceChildren(...paragraphs.map((text) => {
    const p = document.createElement('p'); p.textContent = text; return p;
  }));
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

const legalMessages = {
  seller: ['Dane sprzedawcy', [
    salesConfig.seller.name ? `Nazwa sprzedawcy: ${salesConfig.seller.name}` : 'Dane sprzedawcy sprawdzisz na stronie produktu w Naffy.',
    ...(salesConfig.seller.address ? [`Adres: ${salesConfig.seller.address}`] : []),
    ...(salesConfig.seller.taxId ? [`NIP / dane rejestrowe: ${salesConfig.seller.taxId}`] : []),
  ]],
  contact: ['Kontakt', [salesConfig.seller.email ? `Adres e-mail sprzedawcy: ${salesConfig.seller.email}` : 'W sprawach zakupu i dostępu do pliku skorzystaj z danych kontaktowych sprzedawcy podanych w Naffy.']],
  terms: ['Regulamin zakupu', ['Zakup odbywa się przez Naffy. Przed opłaceniem zamówienia zapoznaj się z regulaminem udostępnionym w procesie zakupu.']],
  privacy: ['Prywatność', ['Ta strona nie zawiera formularzy, analityki ani marketingowych plików cookie. Płatność i dane zamówienia obsługuje zewnętrzna platforma Naffy. Przed zakupem zapoznaj się z zasadami prywatności udostępnionymi w Naffy.']],
  consumer: ['Prawa konsumenta', ['Przed zakupem zapoznaj się w Naffy z informacjami o prawach konsumenta, reklamacjach i odstąpieniu od umowy dotyczących tej oferty.']],
};
const legalUrlKey = { terms: 'termsUrl', privacy: 'privacyUrl', consumer: 'consumerRightsUrl' };
document.querySelectorAll('[data-legal]').forEach((element) => {
  const key = element.dataset.legal;
  const url = salesConfig.legal[legalUrlKey[key]];
  if (isHttpsUrl(url)) { element.href = url; return; }
  element.addEventListener('click', (event) => { event.preventDefault(); showInfo(...legalMessages[key]); });
});
