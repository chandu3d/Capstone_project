class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchBox = '.search-box-text';
    this.searchButton = 'button.search-box-button';
    this.logo = '.header-logo';
  }

  async openHomePage() {
    await this.page.goto('https://demo.nopcommerce.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await this.page.locator(this.searchBox).waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  async searchProduct(productName) {
    await this.page.fill(this.searchBox, productName);
    await this.page.locator(this.searchButton).click();
  }

  async openCategory(categoryUrl) {
    await this.page.goto(categoryUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }
}

module.exports = { ProductPage };