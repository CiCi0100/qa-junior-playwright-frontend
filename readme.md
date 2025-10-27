Perfeito! Vou criar um **README.md completo e organizado** para o seu projeto Playwright, explicando a estrutura, o que está sendo testado, o que está sendo validado e como rodar a automação. Aqui está:

---


# QA Junior Playwright - Frontend Automation

Este projeto contém automações de testes para a aplicação **[Nome da Aplicação]**, utilizando **Playwright** com TypeScript.  

A automação cobre **cenários de login, carrinho de compras e checkout**, incluindo testes positivos e negativos.

---

## Estrutura do Projeto

```markdown
qa-junior-playwright-frontend/
├─ tests/                   # Contém os arquivos de teste
│  ├─ login.spec.ts         # Testes relacionados a login (positivo e negativo)
│  ├─ cart.spec.ts          # Testes do carrinho (positivo e edge cases)
│  └─ checkout.spec.ts      # Testes do checkout (positivo e edge cases)
├─ playwright.config.ts     # Configuração do Playwright
├─ package.json             # Dependências e scripts
└─ README.md                # Este arquivo
```

---

## O que está sendo testado

### **Login**
- Login positivo com diferentes tipos de usuários:
  - `standard_user`
  - `problem_user`
  - `performance_glitch_user`
  - `error_user`
  - `visual_user`
- Login negativo:
  - Usuário inválido
  - Senha incorreta
  - Campos vazios

### **Carrinho**
- Adicionar e remover produtos.
- Remover produtos que não existem.
- Tentar remover mais produtos do que o disponível (edge case).

### **Checkout**
- Finalizar compra com produtos no carrinho.
- Validar campos obrigatórios (nome, endereço, postal code).
- Testar checkout com carrinho vazio (edge case).

---

## O que está sendo validado

- **Mensagens de erro** em campos obrigatórios ou inválidos.
- **Atualização do carrinho** ao adicionar/remover produtos.
- **Fluxo de checkout** correto ou bloqueado quando o carrinho está vazio.
- **Autenticação de usuários** válida ou inválida.
- **Comportamento em diferentes navegadores** (Chromium, Firefox e WebKit).

---

## Configuração do ambiente

1. Clone este repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd qa-junior-playwright-frontend
````

2. Instale as dependências:

```bash
npm install
```

3. Instale os navegadores necessários do Playwright:

```bash
npx playwright install
```

> Se você quiser rodar todos os navegadores (Chromium, Firefox e WebKit).

---

## Como rodar a automação

### Rodar todos os testes

```bash
npx playwright test
```

### Rodar testes em um navegador específico

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Rodar um teste específico

```bash
npx playwright test tests/login.spec.ts
```

### Abrir relatório HTML após os testes

```bash
npx playwright show-report
```

### Opções importantes na configuração

* **Vídeo:** gravado `on` para todos os testes.
* **Screenshot:** gravado `on` para cada teste.
* **Trace:** ativado no primeiro retry (`on-first-retry`).

---

## Observações

* Testes estão preparados para rodar **localmente** com UI visível (`headless: false`) ou em **CI/CD**.
* Para **CI/CD**, a configuração usa **1 worker** e **retries automáticos**.
* Pastas de resultados ficam em:

```
playwright-report/
test-results/
```

* Se houver problemas de gravação de vídeo ou screenshot no Windows com OneDrive, recomenda-se rodar o projeto em uma pasta fora do OneDrive (ex.: `C:\qa-junior-playwright-frontend`) para evitar erros de permissão.

---

## Dependências principais

* `@playwright/test`
* `typescript`
* Node.js 18+ recomendado

