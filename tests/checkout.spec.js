const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/checkoutPage');

test.setTimeout(60000);

async function openCheckoutPage(page) {
  await page.goto('https://demo.nopcommerce.com/checkout', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(2000);
}

// Test Case 1
test('Open checkout page using POM', async ({ page }) => {

  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.openCheckoutPage();

  await expect(page).toHaveURL(/cart/);
});
// Test Case 2
test('Validate checkout page loads successfully', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 3
test('Validate checkout redirect page title', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page).toHaveTitle(/Shopping Cart/);
});

// Test Case 4
test('Validate shopping cart text after checkout redirect', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('body')).toContainText('Shopping cart');
});

// Test Case 5
test('Validate checkout URL redirects to cart page', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/checkout');

  await expect(page).toHaveURL(/cart/);
});

// Test Case 6
test('Validate checkout page header visibility', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('.header')).toBeVisible();
});

// Test Case 7
test('Validate checkout page logo visibility', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('.header-logo')).toBeVisible();
});

// Test Case 8
test('Validate search box visibility on checkout page', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('.search-box-text')).toBeVisible();
});

// Test Case 9
test('Validate search button visibility on checkout page', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('button.search-box-button')).toBeVisible();
});

// Test Case 10
test('Validate footer visibility on checkout page', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('.footer')).toBeVisible();
});

// Test Case 11
test('Validate checkout page responsiveness', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });

  await openCheckoutPage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 12
test('Validate checkout redirect page refresh behavior', async ({ page }) => {
  await openCheckoutPage(page);

  await page.reload();

  await expect(page).toHaveURL(/cart/);
});

// Test Case 13
test('Validate checkout page content wrapper visibility', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('.master-wrapper-content')).toBeVisible();
});

// Test Case 14
test('Validate checkout page navigation menu visibility', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('.header-menu')).toBeVisible();
});

// Test Case 15
test('Validate checkout page body visibility', async ({ page }) => {
  await openCheckoutPage(page);

  await expect(page.locator('body')).toBeVisible();
});