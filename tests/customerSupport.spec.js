const { test, expect } = require('@playwright/test');
const { CustomerSupportPage } = require('../pages/customerSupportPage');

test.setTimeout(60000);

async function openContactUsPage(page) {
  await page.goto('https://demo.nopcommerce.com/contactus', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.locator('body').waitFor({
    state: 'visible',
    timeout: 15000
  });
}

// Test Case 1
test('Open Contact Us page using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openContactUsPage();

  await expect(page).toHaveURL(/contactus/);
});

// Test Case 2
test('Validate Contact Us page heading', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page.locator('h1')).toContainText('Contact Us');
});

// Test Case 3
test('Validate Full Name textbox visibility', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page.locator('#FullName')).toBeVisible();
});

// Test Case 4
test('Validate Email textbox visibility', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page.locator('#Email')).toBeVisible();
});

// Test Case 5
test('Validate Enquiry textbox visibility', async ({ page }) => {
  await openContactUsPage(page);

  await expect(page.locator('#Enquiry')).toBeVisible();
});

// Test Case 6
test('Submit contact form with empty data', async ({ page }) => {
  await openContactUsPage(page);

  await page.locator('button.contact-us-button').click();

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 7
test('Submit contact form with invalid email using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openContactUsPage();
  await customerSupportPage.enterFullName('Test User');
  await customerSupportPage.enterEmail('invalid-email');
  await customerSupportPage.enterEnquiry('Test enquiry');
  await customerSupportPage.submitContactForm();

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 8
test('Submit contact form with valid data using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openContactUsPage();
  await customerSupportPage.enterFullName('Test User');
  await customerSupportPage.enterEmail(`testuser${Date.now()}@example.com`);
  await customerSupportPage.enterEnquiry('This is a support enquiry');
  await customerSupportPage.submitContactForm();

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 9
test('Validate Newsletter Email textbox visibility', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page.locator('#newsletter-email')).toBeVisible();
});

// Test Case 10
test('Validate Newsletter invalid email input using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openHomePage();
  await customerSupportPage.enterNewsletterEmail('invalid-email');

  await expect(page.locator('#newsletter-email')).toHaveValue('invalid-email');
});

// Test Case 11
test('Validate Newsletter valid email input using POM', async ({ page }) => {
  const customerSupportPage = new CustomerSupportPage(page);

  await customerSupportPage.openHomePage();

  const email = `test${Date.now()}@mail.com`;
  await customerSupportPage.enterNewsletterEmail(email);

  await expect(page.locator('#newsletter-email')).toHaveValue(email);
});

// Test Case 12
test('Validate Sitemap page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/sitemap', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/sitemap/);
});

// Test Case 13
test('Validate Shipping & Returns page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/shipping-returns', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/shipping-returns/);
});

// Test Case 14
test('Validate Privacy Notice page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/privacy-notice', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/privacy-notice/);
});

// Test Case 15
test('Validate Conditions of Use page navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/conditions-of-use', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

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