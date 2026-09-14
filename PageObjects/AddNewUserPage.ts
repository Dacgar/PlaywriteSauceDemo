import { Page, expect } from "@playwright/test"

export class AddNewUserPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page

    }

    async clickOnAdd() {
        //await this.page.getByRole('button', { name: 'Add' }).click()
        await this.page.getByText('Add').click()
    }
    async selectUserRole(UserRole: string) {
        //obtiene los div que tengan la clase oxd-grid-item--gutters, 
        // filtra por el que tenga el texto User Role, 
        // obtiene el div que tenga la clase oxd-select-text-input y hace click
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('User Role') })
            .locator('div.oxd-select-text-input')
            .click()

        await this.page.getByText(UserRole, { exact: true }).click()
    }
    async selectEmployeeName(EmployeeName: string) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' })
            .fill(EmployeeName)

        await this.page.getByText('Qwerty Qwerty LName', { exact: true }).click()
    }
    async selectStatus(Status: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Status') })
            .locator('div.oxd-select-text-input')
            .click()

        await this.page.getByText(Status).click()
    }
    async enterUserName(UserName: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Username') })
            .getByRole('textbox')
            .fill(UserName)
    }
        async enterPassword(password: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)
    }
        async enterConfirmPassword(password: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Confirm Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)
    }
    async clickOnSave() {
        await this.page.getByRole('button', { name: 'Save' }).click()
    }
    async checkUserWasAddedMessage() {
        await expect(this.page.locator('p.oxd-text--toast-message')).toHaveText('Successfully Saved')
    }
}