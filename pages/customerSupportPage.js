class CustomerSupportPage {
  constructor(page) {
    this.page = page;

    // Contact Us
    this.fullNameInput = '#FullName';
    this.emailInput = '#Email';
    this.enquiryInput = '#Enquiry';
    this.submitButton = 'button.contact-us-button';

    // Newsletter
    this.newsletterEmail = '#newsletter-email';
    this.newsletterButton = '#newsletter-subscribe-button';

    // Heading
    this.heading = 'h1';
  }

  async openContactUsPage() {
    await this.page.goto('https://demo.nopcommerce.com/contactus', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async enterFullName(name) {
    await this.page.fill(this.fullNameInput, name);
  }

  async enterEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async enterEnquiry(enquiry) {
    await this.page.fill(this.enquiryInput, enquiry);
  }

  async submitContactForm() {
    await this.page.click(this.submitButton);
  }

  async openHomePage() {
    await this.page.goto('https://demo.nopcommerce.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async enterNewsletterEmail(email) {
    await this.page.fill(this.newsletterEmail, email);
  }

  async clickNewsletterSubscribe() {
    await this.page.click(this.newsletterButton);
  }
}

module.exports = { CustomerSupportPage };