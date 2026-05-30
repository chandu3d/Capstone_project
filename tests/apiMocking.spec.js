const { test, expect } = require('@playwright/test');
const { ApiMockingPage } = require('../pages/apiMockingPage');

test.setTimeout(60000);

// Test Case 1
test('Mock API should return 200 status', async ({ page }) => {
  await page.route('**/api/status', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  const status = await page.evaluate(async () => {
    const response = await fetch('/api/status');
    return response.status;
  });

  expect(status).toBe(200);
});

// Test Case 2
test('Mock API should return success message', async ({ page }) => {
  await page.route('**/api/message', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Mock API response success' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const data = await page.evaluate(async () => {
    const res = await fetch('/api/message');
    return await res.json();
  });

  expect(data.message).toBe('Mock API response success');
});

// Test Case 3
test('Mock product API should return product name', async ({ page }) => {
  await page.route('**/api/product', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ product: 'Laptop' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const data = await page.evaluate(async () => {
    const res = await fetch('/api/product');
    return await res.json();
  });

  expect(data.product).toBe('Laptop');
});

// Test Case 4
test('Mock cart API should return item count', async ({ page }) => {
  await page.route('**/api/cart', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ items: 2 })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const data = await page.evaluate(async () => {
    const res = await fetch('/api/cart');
    return await res.json();
  });

  expect(data.items).toBe(2);
});

// Test Case 5
test('Mock checkout API should return allowed status', async ({ page }) => {
  await page.route('**/api/checkout', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ checkoutAllowed: true })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const data = await page.evaluate(async () => {
    const res = await fetch('/api/checkout');
    return await res.json();
  });

  expect(data.checkoutAllowed).toBe(true);
});

// Test Case 6
test('Mock payment API should return pending status', async ({ page }) => {
  await page.route('**/api/payment', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ paymentStatus: 'pending' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const data = await page.evaluate(async () => {
    const res = await fetch('/api/payment');
    return await res.json();
  });

  expect(data.paymentStatus).toBe('pending');
});

// Test Case 7
test('Mock customer support API should return ticket id', async ({ page }) => {
  await page.route('**/api/support', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ticketId: 'SUP-101' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const data = await page.evaluate(async () => {
    const res = await fetch('/api/support');
    return await res.json();
  });

  expect(data.ticketId).toBe('SUP-101');
});

// Test Case 8
test('Mock API should validate response content type', async ({ page }) => {
  await page.route('**/api/content', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ type: 'json' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const response = await page.evaluate(async () => {
    const res = await fetch('/api/content');
    return res.headers.get('content-type');
  });

  expect(response).toContain('application/json');
});

// Test Case 9
test('Mock API should handle 404 response', async ({ page }) => {
  await page.route('**/api/not-found', route =>
    route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Not Found' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const status = await page.evaluate(async () => {
    const res = await fetch('/api/not-found');
    return res.status;
  });

  expect(status).toBe(404);
});

// Test Case 10
test('Mock API should handle server error response', async ({ page }) => {
  await page.route('**/api/server-error', route =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Server Error' })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const status = await page.evaluate(async () => {
    const res = await fetch('/api/server-error');
    return res.status;
  });

  expect(status).toBe(500);
});

// Test Case 11
test('Network request should be captured using POM', async ({ page }) => {
  const apiMockingPage = new ApiMockingPage(page);
  const requests = [];

  page.on('request', request => {
    requests.push(request.url());
  });

  await apiMockingPage.openHomePage();

  expect(requests.length).toBeGreaterThan(0);
});

// Test Case 12
test('Network response should be captured using POM', async ({ page }) => {
  const apiMockingPage = new ApiMockingPage(page);
  const responses = [];

  page.on('response', response => {
    responses.push(response.status());
  });

  await apiMockingPage.openHomePage();

  expect(responses.length).toBeGreaterThan(0);
});

// Test Case 13
test('Route interception should continue normal page request using POM', async ({ page }) => {
  const apiMockingPage = new ApiMockingPage(page);

  await page.route('**/*', route => route.continue());

  await apiMockingPage.openHomePage();

  await expect(page).toHaveURL(/demo.nopcommerce.com/);
});

// Test Case 14
test('Blocked image requests should not stop page load', async ({ page }) => {
  const apiMockingPage = new ApiMockingPage(page);

  await page.route('**/*.{png,jpg,jpeg,webp,svg}', route => route.abort());

  await apiMockingPage.openHomePage();

  await expect(page.locator('body')).toBeVisible();
});

// Test Case 15
test('Mock newsletter API should return subscribed response', async ({ page }) => {
  await page.route('**/api/newsletter', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ subscribed: true })
    })
  );

  await page.goto('https://demo.nopcommerce.com/');
  const data = await page.evaluate(async () => {
    const res = await fetch('/api/newsletter');
    return await res.json();
  });

  expect(data.subscribed).toBe(true);
});

// Test Case 16 - Skipped
test.skip('Skipped API test for future product service validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/future-product-api');
});

// Test Case 17 - Skipped
test.skip('Skipped API test for future order invoice validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/future-invoice-api');
});

// Test Case 18 - Fixme
test.fixme('Fixme test for payment gateway API validation', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/payment-gateway-api');
});