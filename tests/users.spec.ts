import { expect, test } from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"

test('get all the usernames registered', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click();


    //navegar y buscar opción por texto
    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row')
    const usernames: string[] = []

    const rowCount = await rows.count()

    for (let i = 1; i < rowCount; i++) {

        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if (username) {
            usernames.push(username)
        }

    }
    console.log(usernames)
})

test('Select specific user for editions', async ({ page }) => {

    const userForEdition = 'UserTest'

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click();


    //navegar y buscar opción por texto
    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const pencilToEdit = page
    //obtiene la tabla
    .getByRole('table')
    //obtiene los rows
    .getByRole('row')
    //obtiene el row que tenga el texto
    .filter({hasText:userForEdition})
    //devuelve los elementos del row
    .locator('button')
    //Devuelve el que tenga dentro del atributo la clase
    .filter({has: page.locator('i.bi-pencil-fill')})

    await pencilToEdit.click()
    
    const currentUserName = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
    .inputValue()
    //Asersion 1
    expect(currentUserName).toEqual(userForEdition)

    //Asersion 2
    //expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input"))
    //.toHaveValue(currentUserName)

})