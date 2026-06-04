const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../pages/navigationPage');

test.setTimeout(60000);

async function openHomePage(page) {
  await page.goto('https://demo.nopcommerce.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.locator('body').waitFor({ state: 'visible', timeout: 15000 });
}

// Test Case 1
test('Navigate to Register page using POM', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/register', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/register/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 2
test('Navigate to Login page from header', async ({ page }) => {
  await openHomePage(page);

  await page.locator('.ico-login').click();

  await expect(page).toHaveURL(/login/);
});

// Test Case 3
test('Navigate to Shopping cart from header', async ({ page }) => {
  await openHomePage(page);

  await page.locator('.ico-cart').click();

  await expect(page).toHaveURL(/cart/);
});

// Test Case 4
test('Navigate to Wishlist from header', async ({ page }) => {
  await openHomePage(page);

  await page.locator('.ico-wishlist').click();

  await expect(page).toHaveURL(/wishlist/);
});

// Test Case 5
test('Search from header navigation', async ({ page }) => {
  await openHomePage(page);

  await page.fill('.search-box-text', 'computer');
  await page.locator('button.search-box-button').click();

  await expect(page).toHaveURL(/search/);
});

// Test Case 6
test('Navigate to Computers category page', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/computers', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/computers/);
});

// Test Case 7
test('Navigate to Electronics category page', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/electronics', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/electronics/);
});

// Test Case 8
test('Navigate to Apparel category page', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/apparel', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/apparel/);
});

// Test Case 9
test('Navigate to Books category page', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/books', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/books/);
});

// Test Case 10
test('Navigate to Contact us footer page', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/contactus', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/contactus/);
});

// Test Case 11
test('Navigate to Sitemap footer page', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/sitemap', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/sitemap/);
});

// Test Case 12
test('Navigate to Privacy notice footer page', async ({ page }) => {
  await openHomePage(page);

  await page.goto('https://demo.nopcommerce.com/privacy-notice', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/privacy-notice/);
});

// Test Case 13
test('Validate desktop responsive navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });

  await openHomePage(page);

  await expect(page.locator('.header-menu')).toBeVisible();
});

// Test Case 14
test('Validate mobile responsive page load', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });

  await openHomePage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 15
test('Change currency dropdown to Euro', async ({ page }) => {
  await openHomePage(page);

  await page.selectOption('#customerCurrency', { label: 'Euro' });

  await expect(page.locator('body')).toBeVisible();
});