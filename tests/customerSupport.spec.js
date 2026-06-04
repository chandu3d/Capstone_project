const { test, expect } = require('@playwright/test');
const { CustomerSupportPage } = require('../pages/customerSupportPage');

test.setTimeout(60000);

async function openContactUsPage(page) {
  await page.goto('https://demo.nopcommerce.com/contactus', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toBeVisible({
    timeout: 30000
  });
}

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
test('Open Contact Us page using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openContactUsPage();

  await expect(page).toHaveURL(/contactus/);
});

// Test Case 2
test('Validate Contact Us page opens successfully', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page).toHaveURL(/contactus/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 3
test('Validate Contact Us page body visibility', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 4
test('Validate Contact Us page domain', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page).toHaveURL(/demo.nopcommerce.com/);
});

// Test Case 5
test('Validate Contact Us page response', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 6
test('Validate Contact Us page refresh behavior', async ({ page }) => {
  await openContactUsPage(page);

  await page.reload({
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 7
test('Validate Contact Us page direct navigation using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openContactUsPage();

  await expect(page).toHaveURL(/contactus/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 8
test('Validate Contact Us page stability using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openContactUsPage();

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 9
test('Validate homepage opens for newsletter section', async ({ page }) => {
  await openHomePage(page);

  await expect(page).toHaveURL(/demo.nopcommerce.com/);
  await expect(page.locator('body')).toBeVisible();
});

// Test Case 10
test('Validate homepage body visibility for newsletter', async ({ page }) => {
  await openHomePage(page);

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 11
test('Validate homepage domain for customer support', async ({ page }) => {
  await openHomePage(page);

  await expect(page).toHaveURL(/demo.nopcommerce.com/);
});

// Test Case 12
test('Validate Sitemap page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/sitemap', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/sitemap/);
});

// Test Case 13
test('Validate Shipping & Returns page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/shipping-returns', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/shipping-returns/);
});

// Test Case 14
test('Validate Privacy Notice page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/privacy-notice', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/privacy-notice/);
});

// Test Case 15
test('Validate Conditions of Use page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/conditions-of-use', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/conditions-of-use/);
});

// Test Case 16 - Skip
test.skip('Skipped support chat validation for future enhancement', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/support-chat');
});

// Test Case 17 - Fixme
test.fixme('Fixme support ticket API validation pending implementation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/support-ticket-api');
});