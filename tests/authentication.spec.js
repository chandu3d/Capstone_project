const { test, expect } = require('@playwright/test');

test.setTimeout(60000);

// Test Case 1
test('Login with invalid credentials', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.waitForLoadState('networkidle');

  await page.locator('#Email').waitFor();
  await page.fill('#Email', 'invalid@test.com');

  await page.locator('#Password').waitFor();
  await page.fill('#Password', 'wrongpassword');

  await page.locator('button.login-button').click();

  await expect(page).toHaveURL(/login/);
});

// Test Case 2
test('Forgot password navigation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.waitForLoadState('networkidle');

  await page.locator('text=Forgot password?').waitFor();
  await page.locator('text=Forgot password?').click();

  await expect(page).toHaveURL(/passwordrecovery/);
});

// Test Case 3
test('Login page title validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveTitle(/nopCommerce demo store/);
});

// Test Case 4
test('Login with empty email and password', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.waitForLoadState('networkidle');

  await page.locator('button.login-button').click();

  await expect(page).toHaveURL(/login/);
});

// Test Case 5
test('Remember me checkbox validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.waitForLoadState('networkidle');

  await page.check('#RememberMe');

  await expect(page.locator('#RememberMe')).toBeChecked();
});

// Test Case 6
test('Login page heading validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('h1')).toContainText('Welcome, Please Sign In!');
});