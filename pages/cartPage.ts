import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async removeProduct(productId: string) {
    const product = this.page.locator(`#remove-${productId}`);
    if (await product.count() > 0) {
      await product.click();
    }
  }

  async countItems() {
    return this.cartItems.count();
  }

  async goToCheckout() {
    if ((await this.checkoutButton.count()) > 0) {
      await this.checkoutButton.click();
    } else {
      console.log('Carrinho vazio, checkout não disponível');
    }
  }
}

