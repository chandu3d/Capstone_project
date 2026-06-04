class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[name="Email"]';
    this.passwordInput = 'input[name="Password"]';
    this.loginButton = 'button.login-button';
    this.rememberMeCheckbox = '#RememberMe';
    this.forgotPasswordLink = 'text=Forgot password?';
    this.heading = 'h1';
  }

  async openLoginPage() {
    await this.page.goto('https://demo.nopcommerce.com/login', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await this.page.locator(this.emailInput).waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  async enterEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }

  async checkRememberMe() {
    await this.page.check(this.rememberMeCheckbox);
  }

  async clickForgotPassword() {
    await this.page.locator(this.forgotPasswordLink).click();
  }
}

module.exports = { LoginPage };