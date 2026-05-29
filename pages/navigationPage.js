class NavigationPage {
  constructor(page) {
    this.page = page;

    this.registerLink = '.ico-register';
    this.loginLink = '.ico-login';
    this.cartLink = '.ico-cart';
    this.wishlistLink = '.ico-wishlist';

    this.searchBox = '.search-box-text';
    this.searchButton = 'button.search-box-button';

    this.currencyDropdown = '#customerCurrency';

    this.headerMenu = '.header-menu';
  }

  async openHomePage() {
    await this.page.goto('https://demo.nopcommerce.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openCategory(url) {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async searchProduct(product) {
    await this.page.fill(this.searchBox, product);
    await this.page.locator(this.searchButton).click();
  }

  async changeCurrency(label) {
    await this.page.selectOption(this.currencyDropdown, { label });
  }
}

module.exports = { NavigationPage };