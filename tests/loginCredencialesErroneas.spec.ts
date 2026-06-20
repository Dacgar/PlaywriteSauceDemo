import { expect, test } from "@playwright/test";

test('login to hrm incorrect', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin1234')
    await page.getByRole('button', { name: 'Login' }).click()

    const alert = page.getByRole('alert');

    await expect(alert).toContainText('Invalid credentials');
})