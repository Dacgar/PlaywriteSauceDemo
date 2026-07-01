import { expect, test } from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage'

test('login to hrm', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

})