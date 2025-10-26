import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';

const PASSWORD = 'secret_sauce';

test.describe('Login positivo', () => {
  const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user',
  ];

  for (const username of users) {
    test(`Login com sucesso: ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto();
      await loginPage.login(username, PASSWORD);

      await expect(page).toHaveURL(/inventory.html/);
      await productsPage.expectProductsVisible();
    });
  }
});

test.describe('Login negativo', () => {
  test('Usuário inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('usuario_invalido', PASSWORD);
    await loginPage.expectError(/Username and password do not match/i);
  });

  test('Senha incorreta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'senha_errada');
    await loginPage.expectError(/Username and password do not match/i);
  });

  test('Campos vazios', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.expectError(/Username is required|Password is required/i);
  });
});

