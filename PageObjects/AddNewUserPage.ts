import { Page, expect } from "@playwright/test"
import { UserModel } from "../models/UserModel"

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

        //await this.page.getByText(UserRole, { exact: true }).click()
        await this.page.getByRole('option', { name: UserRole }).click()
    }
    async selectEmployeeName(EmployeeName: string) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' })
            .fill(EmployeeName)

        await this.page.getByText(EmployeeName, { exact: true }).click()
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
    async checkUserWasSuccesfullyDeletedMessage() {
        await expect(this.page.locator('p.oxd-text--toast-message')).toHaveText('Successfully Deleted', { timeout: 30_000 })
    }
    async addNewUser(user: UserModel) {
        await this.clickOnAdd()
        await this.selectUserRole(user.role)
        await this.selectEmployeeName(user.employeeName)
        await this.selectStatus(user.status)
        await this.enterUserName(user.userName)
        await this.enterPassword(user.password)
        await this.enterConfirmPassword(user.ConfirmPassword)
        await this.clickOnSave()
    }

    async getEmployeeName(): Promise<string> {
        await expect(this.page.getByRole('textbox', { name: 'Type for hints...' })).toHaveValue(/\S/)
        const fullUserToSearch = await this.page.getByRole('textbox', { name: 'Type for hints...' }).inputValue()
        console.log(`UserToSearch: ${fullUserToSearch}`)
        return fullUserToSearch
    }
}