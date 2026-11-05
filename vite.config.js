import { defineConfig } from 'vite';
import { salesConfig, isHttpsUrl } from './src/config.js';

// Wspólna konfiguracja zasila gotowy HTML także przy wyłączonym JavaScripcie.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

export default defineConfig({
  plugins: [{
    name: 'sales-config-html',
    transformIndexHtml(html) {
      if (!isHttpsUrl(salesConfig.checkoutUrl)
        || !Number.isFinite(salesConfig.pricePLN) || salesConfig.pricePLN <= 0) {
        throw new Error('Nieprawidłowy adres zakupu lub cena w src/config.js.');
      }
      const price = new Intl.NumberFormat('pl-PL', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
      }).format(salesConfig.pricePLN);
      return html.replaceAll('__CHECKOUT_URL__', escapeHtml(salesConfig.checkoutUrl))
        .replaceAll('__PRICE_PLN__', escapeHtml(price))
        .replaceAll('__DELIVERY_DESCRIPTION__', escapeHtml(salesConfig.deliveryDescription));
    },
  }],
  server: { host: '0.0.0.0', port: 5173, strictPort: true, fs: { strict: true } },
  preview: { host: '0.0.0.0', port: 4173, strictPort: true },
  build: { target: 'es2022' },
});
