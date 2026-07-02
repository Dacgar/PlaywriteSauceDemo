import { expect, test } from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage'

test('login to hrm', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

})

test ('login as employee', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.LoginAsEmployee()
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

})