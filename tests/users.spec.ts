import { expect, test } from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"
import { SideMenuOption, SidePanel } from "../Components/SidePanel"
import { TopBarMenu } from "../Components/Top-bar-menu/TopBarMenu"
import { Navigate } from "../PageObjects/Navigate"
import { AddNewUserPage } from "../PageObjects/AddNewUserPage"

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
        .filter({ hasText: userForEdition })
        //devuelve los elementos del row
        .locator('button')
        //Devuelve el que tenga dentro del atributo la clase
        .filter({ has: page.locator('i.bi-pencil-fill') })

    await pencilToEdit.click()

    const currentUserName = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
        .inputValue()
    //Asersion 1
    expect(currentUserName).toEqual(userForEdition)

    //Asersion 2
    //expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input"))
    //.toHaveValue(currentUserName)

})

test('Check user role options', async ({ page }) => {
    const expectedRoleOptions = ['-- Select --', 'Admin', 'ESS', 'Pepe']

    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentUserRoleOptions)

    expect(currentUserRoleOptions, 'The options displayed in the User Role Dropdown do not match the expected options.').toEqual(expectedRoleOptions)
})
test('Check status options', async ({ page }) => {
    const expectedRoleOptions = ['-- Select --', 'Enabled', 'Disabled', 'Pepe']

    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click()
    const currentStatusOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentStatusOptions)

    expect(currentStatusOptions, 'The options displayed in the User Role Dropdown do not match the expected options.').toEqual(expectedRoleOptions)
})
//Sesión 12
test('Filter by user Admin', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    //captura de las filas de la tabla que contienen el role Admin antes de aplicar el filtro
    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    //filas que contienen el role Admin
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })
    //se realiza el conteo de las filas que contienen el role Admin 
    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin users before filtering: ', expectedAdminCount)

    //Aplicar filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole('listbox').getByRole('option', { name: 'Admin' }).click()
    await page.getByRole('button', { name: 'Search' }).click()

    //la tabla filtrada deberia tener exactamente la misma cantidad que encontramos antes
    await expect(allBodyRows).toHaveCount(expectedAdminCount)
    for (let i = 0; i < expectedAdminCount; i++) {
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }
})
//Reto Sesión 12
test('Filter by user ESS', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    //captura de las filas de la tabla que contienen el role Admin antes de aplicar el filtro
    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    //filas que contienen el role Admin
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('ESS')
    })
    //se realiza el conteo de las filas que contienen el role Admin 
    const expectedAdminCount = await currentAdminRows.count()
    console.log('ESS users before filtering: ', expectedAdminCount)

    //Aplicar filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole('listbox').getByRole('option', { name: 'ESS' }).click()
    await page.getByRole('button', { name: 'Search' }).click()

    //la tabla filtrada deberia tener exactamente la misma cantidad que encontramos antes
    await expect(allBodyRows).toHaveCount(expectedAdminCount)
    for (let i = 0; i < expectedAdminCount; i++) {
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('ESS')
    }
})

test('capture all amounts', async ({ page }) => {
    await page.goto('/web/index.php/claim/viewAssignClaim')

    //captura de las filas de la tabla que contienen el role Admin antes de aplicar el filtro
    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const amounts: number[] = []

    const rowCount = await allBodyRows.count()
    console.log('Number of rows', rowCount)

    for (let i = 0; i < rowCount; i++) {

        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()
        console.log("This is the amount in text", amountText)

        if (amountText === null) {
            continue
        }
        const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim())

        amounts.push(convertedNumber)
    }
    console.log(amounts)

    let total = 0

    for (let amount of amounts) {
        total += amount
    }
    console.log("total is", total)
})

test('Add new user', async ({ page }) => {
    const randomUserName = 'goku' + crypto.randomUUID()
    const password = 'R4ndom45...*'
    const employeeToSearch = 'Qwerty LName'

    const navigate = new Navigate(page)
    await navigate.toDashboard()
    //await page.goto('/web/index.php/dashboard/index')

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topBarMenu = new TopBarMenu(page)
    await topBarMenu.userManagment.clickOnUsers()

    const addNewUserPage = new AddNewUserPage(page)
    await addNewUserPage.clickOnAdd()
    await addNewUserPage.selectUserRole('ESS')
    await addNewUserPage.selectEmployeeName(employeeToSearch)
    await addNewUserPage.selectStatus('Enabled')
    await addNewUserPage.enterUserName(randomUserName)
    await addNewUserPage.enterPassword(password)
    await addNewUserPage.enterConfirmPassword(password)
    await addNewUserPage.clickOnSave()
    await addNewUserPage.checkUserWasAddedMessage()

    
})
test('Add new user failed', async ({ page }) => {
    const randomUserName = 'goku' + crypto.randomUUID()
    const password = 'R4ndom45...*'
    const passwordIncorrect = 'R4ndom45...*1'
    const employeeToSearch = 'Qwerty LName'

    const navigate = new Navigate(page)
    await navigate.toDashboard()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topBarMenu = new TopBarMenu(page)
    await topBarMenu.userManagment.clickOnUsers()

    await page.getByRole('button', { name: 'Add' }).click()
    //obtiene los div que tengan la clase oxd-grid-item--gutters, 
    // filtra por el que tenga el texto User Role, 
    // obtiene el div que tenga la clase oxd-select-text-input y hace click
    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('User Role') })
        .locator('div.oxd-select-text-input')
        .click()

    await page.getByText('ESS', { exact: true }).click()

    await page.getByRole('textbox', { name: 'Type for hints...' }).fill(employeeToSearch)
    await page.getByText('Qwerty Qwerty LName', { exact: true }).click()

    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Status') })
        .locator('div.oxd-select-text-input')
        .click()

    await page.getByText('Enabled', { exact: true }).click()

    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Username') })
        .getByRole('textbox')
        .fill(randomUserName)

    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Password', { exact: true }) })
        .getByRole('textbox')
        .fill(password)

    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Confirm Password', { exact: true }) })
        .getByRole('textbox')
        .fill(passwordIncorrect)

    //await page.getByRole('button', {name:'Save'}).click()

    await expect(page.locator('span.oxd-input-field-error-message')).toHaveText('Passwords do not match')
})

