# 🛍️ ClearView Store - Digital Subscriptions

A modern, multi-currency e-commerce platform for selling digital subscriptions with automatic location detection and multiple payment methods.

## ✨ Features

- **🌍 Multi-Currency Support**: 13+ currencies (KES, NGN, GHS, UGX, TZS, ZAR, USD, EUR, GBP, INR, CAD, AUD)
- **📍 Automatic Location Detection**: Detects user location and sets currency automatically
- **💳 Multiple Payment Methods**: Paystack and M-Pesa (Kenya)
- **💱 Real-Time Currency Conversion**: All prices shown in user's local currency
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Built with Tailwind CSS for beautiful, clean interface
- **⚡ Fast & Lightweight**: No external dependencies beyond CDN libraries

## 📁 Project Structure

```
clearview/
├── index.html          # Main store page
├── thank-you.html      # Post-purchase confirmation
├── README.md           # This file
└── assets/            # Product images
    ├── dstv.jpg
    ├── startimes.jpg
    ├── sports.jpg
    ├── movies.jpg
    ├── youtube.jpg
    └── tiktok.jpg
```

## 🚀 Quick Start

### 1. **Clone/Download Repository**
```bash
git clone https://github.com/njoga96kennedy-code/clearview.git
cd clearview
```

### 2. **Add Product Images**
Place product images in the `assets/` folder (recommended size: 400x300px):
- `dstv.jpg`
- `startimes.jpg`
- `sports.jpg`
- `movies.jpg`
- `youtube.jpg`
- `tiktok.jpg`

### 3. **Update Paystack Key**
Edit `index.html` line 344 and replace with your Paystack LIVE key:
```javascript
key: 'pk_live_YOUR_ACTUAL_KEY_HERE',
```

Get your key from: https://dashboard.paystack.com/settings/api-keys

### 4. **Deploy**
- Upload to any web host (GitHub Pages, Netlify, Vercel, etc.)
- Or run locally with a simple HTTP server:
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## 💰 Products & Pricing (in KES)

| Product | Price | Description |
|---------|-------|-------------|
| DSTV Stream | 600 | Stream live DSTV channels for 1 month |
| Startimes ON | 900 | Watch live channels without monthly subscription |
| Sports TV | 800 | Unlimited sports coverage (EPL, La Liga, more) |
| Netflix TV | 900 | Unlimited movies and TV series |
| YouTube Premium | 550 | Ad-free with offline viewing |
| TikTok 18+ | 400 | Exclusive 18+ content access |

Edit the `products` array in `index.html` (lines 114-151) to modify.

## 🌐 Supported Countries & Currencies

| Country | Currency | Payment Methods |
|---------|----------|-----------------|
| Kenya | KES | Paystack, M-Pesa |
| Nigeria | NGN | Paystack |
| Ghana | GHS | Paystack |
| Uganda | UGX | Paystack |
| Tanzania | TZS | Paystack |
| South Africa | ZAR | Paystack |
| USA | USD | Paystack |
| UK | GBP | Paystack |
| Germany | EUR | Paystack |
| India | INR | Paystack |
| Canada | CAD | Paystack |
| Australia | AUD | Paystack |

## 🔧 How It Works

### User Flow

```
User Visits Site
    ↓
Auto Detects Location (via IP)
    ↓
Sets Currency Based on Country
    ↓
Shows Prices in Local Currency
    ↓
User Selects Payment Method
    ↓
User Clicks "Buy Now"
    ↓
Enters Email & Payment Info
    ↓
Payment Processed via Paystack/M-Pesa
    ↓
Redirects to Thank You Page
```

### Payment Conversion Process

1. **All prices stored in KES** (base currency)
2. **Exchange rates applied** to display in user's currency
3. **Paystack conversion**: Uses supported currencies (KES, NGN, ZAR)
4. **Non-supported currencies**: Automatically converted to KES for payment

Example:
- Product: 600 KES
- User in USA: Shows as $4.62 USD
- Payment made in KES: 600 KES charged

## ⚙️ Configuration

### Change Exchange Rates
Edit the `exchangeRates` object in `index.html` (lines 65-78):
```javascript
let exchangeRates = {
  KES: 1,
  USD: 0.0077,  // Change this value
  EUR: 0.0070,
  // ... etc
};
```

### Add New Currency
1. Add to `currencyCountryMap` (lines 83-97)
2. Add to `paymentMethods` (lines 99-112)
3. Add exchange rate to `exchangeRates` (lines 65-78)
4. Add symbol to `formatPrice()` function (lines 218-241)

### Add New Payment Method
1. Add to `paymentMethods` object
2. Create payment function (e.g., `payWithXYZ()`)
3. Call it from `initPayment()` function

## 🔒 Security Considerations

⚠️ **Important Security Notes:**

1. **API Keys**
   - Never commit Paystack keys to public repositories
   - Use environment variables in production
   - Rotate keys periodically

2. **Location API**
   - Using free ipapi.co service (add CORS handling if needed)
   - Consider self-hosted solution for production

3. **Payment Verification**
   - Always verify payments on backend
   - Don't trust client-side confirmation alone
   - Implement webhook handlers for payment confirmation

4. **Email Validation**
   - Validate email format before payment
   - Verify email before sending receipts

5. **HTTPS**
   - Always use HTTPS in production
   - Redirect HTTP to HTTPS

## 🐛 Troubleshooting

### Products Not Showing
- Check if `assets/` folder exists and is in same directory as `index.html`
- Verify image file names match exactly

### Location Detection Fails
- Falls back to Kenya (KES) automatically
- User can manually change currency with button
- Check browser console for errors

### Payment Issues
- Ensure Paystack key is correct (pk_live_...)
- Check if Paystack account is verified
- Test with test mode first
- Verify phone number format for M-Pesa: 254XXXXXXXXX

### Exchange Rate Issues
- Update rates in `exchangeRates` object
- Check if conversion formulas are correct
- Test with manual calculations

## 📊 Analytics & Tracking

To add analytics, insert after line 356 (Paystack callback):
```javascript
// Google Analytics example
gtag('event', 'purchase', {
  currency: userCurrency,
  value: displayPrice,
  items: [{name: product.name}]
});
```

## 🚀 Deployment Options

### GitHub Pages
```bash
git push origin main
# Enable Pages in repository settings
```

### Netlify
- Connect repository to Netlify
- Auto-deploys on push

### Vercel
- Connect repository to Vercel
- Zero-config deployment

### Traditional Hosting
- Upload all files via FTP
- Ensure `.htaccess` has proper CORS headers if needed

## 📝 License

This project is open source. Free to use and modify.

## 📞 Support & Contact

**WhatsApp**: [+254781052997](https://wa.me/254781052997)

## 🔮 Future Enhancements

- [ ] Subscription management panel
- [ ] Admin dashboard for product management
- [ ] Email receipt system
- [ ] Payment history tracking
- [ ] Discount codes/coupons
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Recurring payments
- [ ] Refund management

## 👨‍💻 Contributing

Found a bug or have a feature request? 
- Open an issue on GitHub
- Submit a pull request with improvements

---

**Last Updated**: May 7, 2026
**Version**: 1.0.0
