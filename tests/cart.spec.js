const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cartPage');

test.setTimeout(60000);

async function openCartPage(page) {
  await page.goto('https://demo.nopcommerce.com/cart', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(2000);
}

// Test Case 1
test('Open shopping cart page using POM', async ({ page }) => {

  const cartPage = new CartPage(page);

  await cartPage.openCartPage();

  await expect(page).toHaveURL(/cart/);
});

// Test Case 2
test('Validate shopping cart page heading', async ({ page }) => {
  await openCartPage(page);

  await expect(page.locator('h1')).toContainText('Shopping cart');
});

// Test Case 3
test('Validate cart page title', async ({ page }) => {
  await openCartPage(page);

  await expect(page).toHaveTitle(/Shopping Cart/);
});

// Test Case 4
test('Validate cart page URL', async ({ page }) => {
  await openCartPage(page);

  await expect(page).toHaveURL(/cart/);
});

// Test Case 5
test('Validate cart page loads successfully', async ({ page }) => {
  await openCartPage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 6
test('Validate homepage logo visibility on cart page', async ({ page }) => {
  await openCartPage(page);

  await expect(page.locator('.header-logo')).toBeVisible();
});

// Test Case 7
test('Validate search box visibility on cart page', async ({ page }) => {
  await openCartPage(page);

  await expect(page.locator('.search-box-text')).toBeVisible();
});

// Test Case 8
test('Validate search button visibility on cart page', async ({ page }) => {
  await openCartPage(page);

  await expect(page.locator('button.search-box-button')).toBeVisible();
});

// Test Case 9
test('Validate footer visibility on cart page', async ({ page }) => {
  await openCartPage(page);

  await expect(page.locator('.footer')).toBeVisible();
});

// Test Case 10
test('Validate cart page body visibility', async ({ page }) => {
  await openCartPage(page);

  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 11
test('Validate cart page responsiveness', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });

  await openCartPage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 12
test('Validate cart page refresh behavior', async ({ page }) => {
  await openCartPage(page);

  await page.reload();

  await expect(page).toHaveURL(/cart/);
});

// Test Case 13
test('Validate cart page navigation from direct URL', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/cart');

  await expect(page).toHaveURL(/cart/);
});

// Test Case 14
test('Validate cart page loads after navigation', async ({ page }) => {
  await openCartPage(page);

  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 15
test('Validate cart page content response', async ({ page }) => {
  await openCartPage(page);

  await expect(page.locator('body')).toBeVisible();
});