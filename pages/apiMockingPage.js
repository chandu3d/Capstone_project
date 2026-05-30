class ApiMockingPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://demo.nopcommerce.com';
  }

  async openHomePage() {
    await this.page.goto(this.baseUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openLoginPage() {
    await this.page.goto(`${this.baseUrl}/login`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openRegisterPage() {
    await this.page.goto(`${this.baseUrl}/register`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openCartPage() {
    await this.page.goto(`${this.baseUrl}/cart`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openContactPage() {
    await this.page.goto(`${this.baseUrl}/contactus`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }
}

module.exports = { ApiMockingPage };