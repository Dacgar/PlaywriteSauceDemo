import { expect, test } from "@playwright/test";
//import { LoginPage } from "../PageObjects/LoginPage";

test('login to hrm incorrect', async ({ page }) => {

    //const loginPage = new LoginPage(page)
    //await loginPage.doLogin('Admin', 'admin123')

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin1234')
    await page.getByRole('button', { name: 'Login' }).click()

    const alert = page.getByRole('alert');

    await expect(alert).toContainText('Invalid credentials');
})