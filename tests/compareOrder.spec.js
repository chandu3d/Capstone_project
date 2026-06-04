const { test, expect } = require('@playwright/test');
const { CompareOrderPage } = require('../pages/compareOrderPage');

test.setTimeout(60000);

async function openComparePage(page) {
  await page.goto('https://demo.nopcommerce.com/compareproducts', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toBeVisible({
    timeout: 30000
  });
}

// Test Case 1
test('Open compare products page using POM', async ({ page }) => {
  const compareOrderPage = new CompareOrderPage(page);

  await compareOrderPage.openComparePage();

  await expect(page).toHaveURL(/compareproducts/);
});

// Test Case 2
test('Validate compare products page URL', async ({ page }) => {
  await openComparePage(page);

  await expect(page).toHaveURL(/compareproducts/);
});

// Test Case 3
test('Validate compare products page loads successfully', async ({ page }) => {
  await openComparePage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 4
test('Validate compare page body visibility', async ({ page }) => {
  await openComparePage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 5
test('Validate compare page domain', async ({ page }) => {
  await openComparePage(page);

  await expect(page).toHaveURL(/demo.nopcommerce.com/);
});

// Test Case 6
test('Validate compare page navigation stability', async ({ page }) => {
  await openComparePage(page);

  await expect(page).toHaveURL(/compareproducts/);
});

// Test Case 7
test('Validate compare page response visible', async ({ page }) => {
  await openComparePage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 8
test('Validate compare page basic page load', async ({ page }) => {
  await openComparePage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 9
test('Validate compare page reload behavior', async ({ page }) => {
  await openComparePage(page);

  await page.reload({
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/compareproducts/);
});

// Test Case 10
test('Open order history page without login', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/order/history', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/order\/history|login/);
});

// Test Case 11
test('Validate order history page body visibility', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/order/history', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 12
test('Validate order history URL or login redirect', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/order/history', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/order\/history|login/);
});

// Test Case 13
test('Validate order history page loads successfully', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/order/history', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 14
test('Validate compare page content visibility', async ({ page }) => {
  await openComparePage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 15
test('Validate compare page direct URL navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/compareproducts', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/compareproducts/);
});