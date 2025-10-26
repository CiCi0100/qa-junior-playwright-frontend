import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProduct(productId: string) {
    await this.page.click(`#add-to-cart-${productId}`);
  }

  async removeProduct(productId: string) {
    const product = this.page.locator(`#remove-${productId}`);
    if (await product.count() > 0) {
      await product.click();
    }
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async expectProductsVisible() {
    await expect(this.inventoryList).toBeVisible();
  }
}

