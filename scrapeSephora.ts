import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const baseURL = 'https://www.sephora.com/ca/en/shop/moisturizing-cream-oils';

  await page.goto(baseURL);
  await page.waitForSelector('[data-comp="ProductGrid"]');

  const productLinks = await page.$$eval('a.css-ix8km1', links =>
    links.map(link => (link as HTMLAnchorElement).href).slice(0, 5) // Limit for test
  );

  const products: { name: string; brand: string; ingredients: string[] }[] = [];

  for (const url of productLinks) {
    await page.goto(url);
    await page.waitForTimeout(1000);

    const name = await page.textContent('h1[data-at="product_name"]');
    const brand = await page.textContent('[data-at="brand_name"]');
    const ingredientText = await page.textContent('div[data-comp="Ingredients"]');

    if (!name || !brand || !ingredientText) continue;

    const ingredients = ingredientText
      .split(/[,•]/)
      .map(i => i.trim())
      .filter(i => i.length > 0);

    products.push({
      name,
      brand,
      ingredients
    });

    console.log(`Scraped: ${name}`);
  }

  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  console.log('✅ Data saved to products.json');

  await browser.close();
})();
