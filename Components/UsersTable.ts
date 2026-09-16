import { Page, Locator, expect } from "@playwright/test";

export class UsersTable {

    readonly page: Page
    constructor(page: Page) {

        this.page = page
    }

    private getAllBodyRows(): Locator {
        //captura de las filas de la tabla que contienen el role Admin antes de aplicar el filtro
        return this.page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    }

    private getAdminRows(): Locator {
        const allBodyRows = this.getAllBodyRows()
        //filas que contienen el role Admin
        const currentAdminRows = allBodyRows.filter({
            has: this.page.getByRole('cell').nth(2).getByText('Admin')
        })
        return currentAdminRows
    }
    private async getFirstAdminFromTable(): Promise<Locator> {
        const currentAdminRows = this.getAdminRows()
        const firstAdminToSearch = currentAdminRows.nth(0)
        await expect(firstAdminToSearch, "No Admin Users found in the table").toHaveCount(1)
        return firstAdminToSearch
    }

    async editFirstAdminOnTheTable() {
        const firstAdminToEdit = await this.getFirstAdminFromTable()
        await firstAdminToEdit
            //devuelve los elementos del row
            .locator('button')
            //Devuelve el que tenga dentro del atributo la clase
            .filter({ has: this.page.locator('i.bi-pencil-fill') }).click()
    }
    async clickOnDeleteActionUsername(username: string) {
        const allBodyRows = this.getAllBodyRows()

        const filteredRowsByUserName = allBodyRows.filter(
            {
                has: this.page.getByRole('cell').nth(1).getByText(username)

            }
        )
        expect(filteredRowsByUserName, `No rows contains username: ${username} were found`).toHaveCount(1)

        await filteredRowsByUserName.locator('button')
            .filter({ has: this.page.locator('i.bi-trash') }).click()
    }
    async acceptDeleteUser() {
        await this.page.getByRole('button', { name: /Yes, Delete/ }).click()
    }

}






