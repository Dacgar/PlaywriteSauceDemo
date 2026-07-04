import { Page } from "@playwright/test";
import { UserManagementMenu } from "./UserManagementMenu";
import { JobMenu } from "./JobMenu";

export class TopBarMenu {

    private readonly page:Page
    readonly userManagment: UserManagementMenu
    readonly job: JobMenu

    constructor(page: Page) {
        this.page = page
        this.userManagment = new UserManagementMenu(page)
        this.job = new JobMenu(page)
    }

}