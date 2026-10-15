# Pailful Flowers

A flower shop website with a browsable catalog, product details and a cart. It is plain HTML, CSS and JavaScript, so there is nothing to install or build. All flower illustrations are drawn in code, so there are no image files either.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The page: header, shop, delivery, about, visit |
| `styles.css` | All styling |
| `products.js` | **Shop settings and products. Edit this to change names, prices and the shop email.** |
| `art.js` | Draws the flower illustrations |
| `app.js` | Filtering, sorting, product details, cart and email orders |
| `vercel.json` | Vercel settings (clean URLs and basic security headers) |

## Preview on your computer

Open `index.html` in a browser. To run it the way a server would, run `npx serve` in this folder.

## Upload to GitHub

**Without the command line**

1. Sign in at github.com and select **New repository**. Name it `flower-shop`, then select **Create repository**.
2. On the new repository page, select **uploading an existing file**.
3. Drag in everything from this folder (the files, not the folder itself) and select **Commit changes**.

**With the command line**

```bash
cd pailful-flower-shop
git init
git add .
git commit -m "Add flower shop site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/flower-shop.git
git push -u origin main
```

## Import into Vercel

1. Sign in at vercel.com with your GitHub account.
2. Select **Add New**, then **Project**, and pick the `flower-shop` repository.
3. Leave the settings as they are: Framework Preset **Other**, no build command, no output directory.
4. Select **Deploy**. Your site is live in under a minute at a `.vercel.app` address.

After that, every push to `main` redeploys the site automatically. To use your own domain, open the project in Vercel and go to **Settings**, then **Domains**.

## Make it yours

- **Products, prices and email:** edit `products.js`. Orders are sent to the `email` value at the top of that file.
- **Delivery fee and free-delivery amount:** also in `products.js`.
- **Shop address, phone number and hours:** edit the "Visit the shop" section in `index.html`. The current values are placeholders.
- **Copy:** the About and Delivery text in `index.html` is sample text. Replace it with your own details and claims.
- **Colors and fonts:** the palette is defined at the top of `styles.css`.

## How orders work

This site has no server or payment system. When a customer fills in the delivery form and selects **Send order by email**, their email app opens with the order written out and addressed to your shop. You reply to confirm the total and take payment.

To take card payments online later, you can add Stripe Payment Links or a hosted checkout such as Shopify's Buy Button.
