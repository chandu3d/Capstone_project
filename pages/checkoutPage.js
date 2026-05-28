class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.logo = '.header-logo';
    this.searchBox = '.search-box-text';
    this.searchButton = 'button.search-box-button';
    this.footer = '.footer';
    this.header = '.header';
    this.navigationMenu = '.header-menu';
  }

  async openCheckoutPage() {
    await this.page.goto('https://demo.nopcommerce.com/checkout', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await this.page.waitForTimeout(2000);
  }

  async refreshPage() {
    await this.page.reload();
  }
}

module.exports = { CheckoutPage };