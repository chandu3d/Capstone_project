const { test, expect } = require('@playwright/test');
const { CompareOrderPage } = require('../pages/compareOrderPage');

test.setTimeout(60000);

async function openComparePage(page) {
  await page.goto('https://demo.nopcommerce.com/compareproducts', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
}

// Test Case 1
test('Open compare products page using POM', async ({ page }) => {
  const compareOrderPage = new CompareOrderPage(page);

  await compareOrderPage.openComparePage();

  await expect(page).toHaveURL(/compareproducts/);
});

// Test Case 2
test('Validate compare products page heading', async ({ page }) => {
  await openComparePage(page);
  await expect(page.locator('h1')).toContainText('Compare products');
});

// Test Case 3
test('Validate compare products page title', async ({ page }) => {
  await openComparePage(page);
  await expect(page).toHaveTitle(/Compare Products/);
});

// Test Case 4
test('Validate compare page body visibility', async ({ page }) => {
  await openComparePage(page);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 5
test('Validate compare page contains compare text', async ({ page }) => {
  await openComparePage(page);
  await expect(page.locator('body')).toContainText('Compare products');
});

// Test Case 6
test('Validate header visibility on compare page', async ({ page }) => {
  await openComparePage(page);
  await expect(page.locator('.header')).toBeVisible();
});

// Test Case 7
test('Validate logo visibility on compare page', async ({ page }) => {
  await openComparePage(page);
  await expect(page.locator('.header-logo')).toBeVisible();
});

// Test Case 8
test('Validate search box visibility on compare page', async ({ page }) => {
  await openComparePage(page);
  await expect(page.locator('.search-box-text')).toBeVisible();
});

// Test Case 9
test('Validate footer visibility on compare page', async ({ page }) => {
  await openComparePage(page);
  await expect(page.locator('.footer')).toBeVisible();
});

// Test Case 10
test('Open order history page without login', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/order/history', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/login/);
});

// Test Case 11
test('Validate order history redirects to login page', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/order/history', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page.locator('body')).toContainText('Welcome, Please Sign In!');
});

// Test Case 12
test('Validate login page shown for order history access', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/order/history', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page.locator('#Email')).toBeVisible();
});

// Test Case 13
test('Validate compare page refresh behavior', async ({ page }) => {
  await openComparePage(page);

  await page.reload();

  await expect(page).toHaveURL(/compareproducts/);
});

// Test Case 14
test('Validate compare page content wrapper visibility', async ({ page }) => {
  await openComparePage(page);

  await expect(page.locator('.master-wrapper-content')).toBeVisible();
});

// Test Case 15
test('Validate compare page direct URL navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/compareproducts');

  await expect(page).toHaveURL(/compareproducts/);
});