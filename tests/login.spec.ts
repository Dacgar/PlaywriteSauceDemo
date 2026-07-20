import { expect, test } from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage'
import {SideMenuOption, SidePanel} from '../Components/SidePanel'



test('login to hrm', async ({ page }) => {

    /*const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()*/

    await page.goto("/web/index.php/dashboard/index")

    /*await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()*/
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)  
    await sidePanel.clickOnOption(SideMenuOption.BUZZ)
    await sidePanel.clickOnOption(SideMenuOption.DASHBOARD)


})

/*test ('login as employee', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.LoginAsEmployee()
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

})*/
test('login to hrm 2', async ({ page }) => {

    /*const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()*/

    await page.goto("/web/index.php/dashboard/index")

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

})