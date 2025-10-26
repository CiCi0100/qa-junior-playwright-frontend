import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

const user = { username: 'standard_user', password: 'secret_sauce' };

test.describe('Checkout positivo', () => {
  test('Finalizar compra com 2 produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    await productsPage.addProduct('sauce-labs-backpack');
    await productsPage.addProduct('sauce-labs-bike-light');
    await productsPage.goToCart();

    expect(await cartPage.countItems()).toBe(2);

    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInfo('Ciara', 'Nascimento', '12345');
    await checkoutPage.finishPurchase();

    await checkoutPage.expectSuccessMessage(/Thank you for your order!/i);
  });
});

test.describe('Checkout negativo / edge cases', () => {
  test('Dados obrigatórios vazios', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    await productsPage.addProduct('sauce-labs-backpack');
    await productsPage.goToCart();

    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInfo('', '', '');
    await checkoutPage.expectError(/First Name is required|Last Name is required|Postal Code is required/i);
  });

  test('Carrinho vazio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    const count = await cartPage.countItems();
    expect(count).toBe(0);

    // Não tenta clicar em botão inexistente
    await cartPage.goToCheckout();
  });

  test('Postal code vazio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    await productsPage.addProduct('sauce-labs-backpack');
    await productsPage.goToCart();

    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInfo('Ciara', 'Nascimento', '');
    await checkoutPage.expectError(/Postal Code is required/i);
  });
});

