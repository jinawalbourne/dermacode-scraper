# Dermacode Scraper

This project provides two tools to gather and convert skincare product data for use in the [Dermacode](https://github.com/jinawalbourne/dermacode) mobile app.

## Tools Included

### 1. CSV to JSON Converter (`convertCsvToJson.ts`)
- Converts a Kaggle / GitHub dataset (`.csv`) into a `products.json` file
- Parses product name, brand, ingredients, and skin-type suitability
- Best for quick access to over 1,400 clean and labeled products

### 2. Playwright Web Scraper (`scrapeSephora.ts`)
- Scrapes live skincare product data directly from Sephora's website using Playwright
- Extracts product name, brand, and ingredients
- Best used for fetching the most up-to-date product information

> While both tools are available, this project primarily uses the Kaggle dataset as its source of truth due to its size and cleanliness.


## Files

File Purpose
- `convertCsvToJson.ts`: Converts downloaded CSV to JSON
- `scrapeSephora.ts`: Scrapes live Sephora data using Playwright
- `sephoraData.csv`: Your raw Kaggle/GitHub dataset
- `products.json`: Output file used in the mobile app

## How to Use

### CSV to JSON

```bash
npx ts-node convertCsvToJson.ts
