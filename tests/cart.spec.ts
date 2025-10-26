import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';

const user = { username: 'standard_user', password: 'secret_sauce' };

test.describe('Carrinho positivo', () => {
  test('Remover produto do carrinho', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    await productsPage.addProduct('sauce-labs-backpack');
    await productsPage.addProduct('sauce-labs-bike-light');
    await productsPage.goToCart();

    await cartPage.removeProduct('sauce-labs-bike-light');

    expect(await cartPage.countItems()).toBe(1);
  });
});

test.describe('Carrinho negativo / edge cases', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    await productsPage.addProduct('sauce-labs-backpack');
    await productsPage.goToCart();
  });

  test('Remover produto que não existe', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeProduct('sauce-labs-bike-light'); // não existe
    expect(await cartPage.countItems()).toBe(1);
  });

  test('Remover mais produtos do que adicionados', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeProduct('sauce-labs-backpack'); // remove 1 existente
    await cartPage.removeProduct('sauce-labs-backpack'); // remove inexistente
    expect(await cartPage.countItems()).toBe(0);
  });
});

