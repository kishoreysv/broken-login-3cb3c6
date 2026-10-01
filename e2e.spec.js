const { test, expect } = require('@playwright/test');

test.describe('Broken Auth Gallery flows', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ page }) => {
        const consoleErrors = [];
        page.on('console', (message) => {
            if (message.type() === 'error') {
                consoleErrors.push(message.text());
            }
        });
        page.on('pageerror', (error) => {
            consoleErrors.push(error.message);
        });
        page.__consoleErrors = consoleErrors;
    });

    test.afterEach(async ({ page }, testInfo) => {
        expect(page.__consoleErrors, `Console errors in ${testInfo.title}`).toEqual([]);
    });

    test('shows the pre-login state and allows toggling dark mode', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Broken Auth Gallery' })).toBeVisible();
        await expect(page.locator('#login-container')).toBeVisible();
        await expect(page.locator('#gallery-container')).toBeHidden();

        const themeButton = page.locator('#theme-toggle');
        await themeButton.click();
        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
        await expect(themeButton).toHaveAttribute('aria-pressed', 'true');
        await page.screenshot({ path: 'artifacts-theme-toggle.png' });
    });

    test('persists theme preference after reload and shows invalid login errors', async ({ page }) => {
        await page.goto('/');
        await page.locator('#theme-toggle').click();
        await page.reload();
        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');

        await page.locator('#username').fill('guest');
        await page.locator('#password').fill('wrong');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#error-msg')).toHaveText('Invalid credentials. (Try username "bypass")');
    });

    test('reveals the gallery after successful login', async ({ page }) => {
        await page.goto('/');
        await page.locator('#username').fill('admin');
        await page.locator('#password').fill('12345');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('#login-container')).toBeHidden();
        await expect(page.locator('#gallery-container')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Secret Gallery' })).toBeVisible();
        await expect(page.getByAltText('Landscape')).toBeVisible();
        await expect(page.getByAltText('Mountains')).toBeVisible();
    });
});
