class CompareOrderPage {
  constructor(page) {
    this.page = page;

    this.compareUrl = 'https://demo.nopcommerce.com/compareproducts';
    this.orderHistoryUrl = 'https://demo.nopcommerce.com/order/history';

    this.heading = 'h1';
    this.body = 'body';
    this.header = '.header';
    this.logo = '.header-logo';
    this.searchBox = '.search-box-text';
    this.footer = '.footer';
    this.contentWrapper = '.master-wrapper-content';
    this.emailInput = '#Email';
  }

  async openComparePage() {
    await this.page.goto(this.compareUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openOrderHistoryPage() {
    await this.page.goto(this.orderHistoryUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async refreshPage() {
    await this.page.reload();
  }
}

module.exports = { CompareOrderPage };