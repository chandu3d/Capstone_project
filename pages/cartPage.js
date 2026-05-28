class CartPage {
  constructor(page) {
    this.page = page;

    this.cartLink = '.cart-label';
    this.cartHeading = 'h1';
    this.logo = '.header-logo';
    this.searchBox = '.search-box-text';
    this.footer = '.footer';
  }

  async openCartPage() {
    await this.page.goto('https://demo.nopcommerce.com/cart', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await this.page.waitForTimeout(2000);
  }

  async openCartUsingURL() {
    await this.page.goto('https://demo.nopcommerce.com/cart');
  }
}

module.exports = { CartPage };