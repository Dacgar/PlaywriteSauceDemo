import { Page } from "@playwright/test"
import { SideMenuOption, SidePanel } from "../Components/SidePanel"
import { TopBarMenu } from "../Components/Top-bar-menu/TopBarMenu"
export class Navigate {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    async toDashboard() {
        await this.page.goto('/web/index.php/dashboard/index')
    }

    async toUsers() {
            await this.toDashboard()
            //await page.goto('/web/index.php/dashboard/index')
        
            const sidePanel = new SidePanel(this.page)
            await sidePanel.clickOnOption(SideMenuOption.ADMIN)
        
            const topBarMenu = new TopBarMenu(this.page)
            await topBarMenu.userManagment.clickOnUsers()
    }
}