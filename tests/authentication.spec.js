const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.setTimeout(60000);

async function openLoginPage(page) {
  await page.goto('https://demo.nopcommerce.com/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toBeVisible({
    timeout: 30000
  });
}

// Test Case 1
test('Login with invalid credentials using POM', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  await loginPage.enterEmail('invalid@test.com');

  await loginPage.enterPassword('wrongpassword');

  await loginPage.clickLoginButton();

  await expect(page).toHaveURL(/login/);
});

// Test Case 2
test('Forgot password navigation', async ({ page }) => {
  await openLoginPage(page);

  await page.locator('text=Forgot password?').click();

  await expect(page).toHaveURL(/passwordrecovery/);
});

// Test Case 3
test('Login page title validation', async ({ page }) => {
  await openLoginPage(page);

  await expect(page).toHaveTitle(/nopCommerce demo store/);
});

// Test Case 4
test('Login with empty email and password', async ({ page }) => {
  await openLoginPage(page);

  await page.locator('button.login-button').click();

  await expect(page).toHaveURL(/login/);
});

// Test Case 5
test('Remember me checkbox validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(5000);

  const rememberMe = page.locator('#RememberMe');

  await expect(rememberMe).toBeVisible({ timeout: 30000 });

  await rememberMe.check();

  await expect(rememberMe).toBeChecked();
});

// Test Case 6
test('Login page heading validation', async ({ page }) => {
  await openLoginPage(page);

  await expect(page.locator('h1')).toContainText('Welcome, Please Sign In!');
});

// Test Case 7
test('Email required field validation', async ({ page }) => {
  await openLoginPage(page);

  await page.fill('#Password', 'Test@123');
  await page.locator('button.login-button').click();

  await expect(page).toHaveURL(/login/);
});

// Test Case 8
test('Password required field validation', async ({ page }) => {
  await openLoginPage(page);

  await page.fill('#Email', 'sample@test.com');
  await page.locator('button.login-button').click();

  await expect(page).toHaveURL(/login/);
});

// Test Case 9
test('Email textbox accepts valid email input', async ({ page }) => {
  await openLoginPage(page);

  await page.fill('#Email', 'sample@test.com');

  await expect(page.locator('#Email')).toHaveValue('sample@test.com');
});

// Test Case 10
test('Password textbox accepts input', async ({ page }) => {
  await openLoginPage(page);

  const passwordBox = page.locator('input[name="Password"]');

  await expect(passwordBox).toBeVisible({ timeout: 30000 });

  await passwordBox.fill('Password123');

  await expect(passwordBox).toHaveValue('Password123');
});

// Test Case 11
test('Forgot password page navigation validation', async ({ page }) => {
  await openLoginPage(page);

  await page.locator('text=Forgot password?').click();

  await expect(page).toHaveURL(/passwordrecovery/);
});

// Test Case 12
test('Password recovery with empty email validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/passwordrecovery', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.locator('#Email').waitFor({ state: 'visible', timeout: 15000 });

  await page.locator('button.password-recovery-button').click();

  await expect(page).toHaveURL(/passwordrecovery/);
});

// Test Case 13
test('Login button visibility validation', async ({ page }) => {
  await openLoginPage(page);

  await expect(page.locator('button.login-button')).toBeVisible();
});

// Test Case 14
test('Email textbox visibility validation', async ({ page }) => {
  await openLoginPage(page);

  await expect(page.locator('#Email')).toBeVisible();
});

// Test Case 15
test('Password textbox visibility validation', async ({ page }) => {
  await openLoginPage(page);

  await expect(page.locator('#Password')).toBeVisible();
});