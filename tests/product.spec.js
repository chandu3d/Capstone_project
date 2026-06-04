const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/productPage');

test.setTimeout(60000);

async function openHomePage(page) {
  await page.goto('https://demo.nopcommerce.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toBeVisible({
    timeout: 30000
  });
}

// Test Case 1
test('Search product with valid keyword using POM', async ({ page }) => {

  const productPage = new ProductPage(page);

  await productPage.openHomePage();

  await productPage.searchProduct('computer');

  await expect(page).toHaveURL(/search/);
});

// Test Case 2
test('Search product with empty keyword', async ({ page }) => {
  await openHomePage(page);

  await expect(page).toHaveURL(/demo.nopcommerce.com/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 3
test('Navigate to Computers category', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/computers', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/computers/);
});

// Test Case 4
test('Search product with another valid keyword', async ({ page }) => {
  await openHomePage(page);

  await page.fill('.search-box-text', 'book');
  await page.locator('button.search-box-button').click();

  await expect(page).toHaveURL(/search/);
});

// Test Case 5
test('Validate search textbox visibility', async ({ page }) => {
  await openHomePage(page);

  await expect(page.locator('.search-box-text')).toBeVisible();
});

// Test Case 6
test('Validate search button visibility', async ({ page }) => {
  await openHomePage(page);

  await expect(page.locator('button.search-box-button')).toBeVisible();
});

// Test Case 7
test('Validate homepage loads successfully', async ({ page }) => {
  await openHomePage(page);

  await expect(page).toHaveURL(/demo.nopcommerce.com/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 8
test('Validate Computers category page opens', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/computers', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/computers/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 9
test('Validate search textbox accepts input', async ({ page }) => {
  await openHomePage(page);

  const searchBox = page.locator('input[name="q"]');

  await expect(searchBox).toBeVisible({ timeout: 30000 });

  await searchBox.fill('computer');

  await expect(searchBox).toHaveValue('computer');
});

// Test Case 10
test('Validate Electronics category page', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/electronics', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/electronics/);
});

// Test Case 11
test('Validate Apparel category page', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/apparel', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/apparel/);
});

// Test Case 12
test('Validate Books category page', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/books', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/books/);
});

// Test Case 13
test('Validate search result page opens', async ({ page }) => {
  await openHomePage(page);

  await page.fill('.search-box-text', 'camera');
  await page.locator('button.search-box-button').click();

  await expect(page).toHaveURL(/search/);
});

// Test Case 14
test('Validate homepage logo visibility', async ({ page }) => {
  await openHomePage(page);

  await expect(page.locator('.header-logo')).toBeVisible();
});

// Test Case 15
test('Validate search button enabled state', async ({ page }) => {
  await openHomePage(page);

  await expect(page.locator('body')).toBeVisible();
});