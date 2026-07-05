import { Locator, Page } from "@playwright/test";

export class JobMenu {

    readonly page: Page
    readonly job: Locator
    readonly jobTitleOption
    readonly payGradesOption
    readonly EmploymentStatusOption
    readonly JobCategoriesOption
    readonly WorkShiftsOption
    constructor(page: Page) {
        this.page = page
        this.job = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job')
        this.jobTitleOption = page.getByRole('menuitem', { name: 'Job Titles' })
        this.payGradesOption = page.getByRole('menuitem', { name: 'Pay Grades' })
        this.EmploymentStatusOption = page.getByRole('menuitem', { name: 'Employment Status' })
        this.JobCategoriesOption = page.getByRole('menuitem', { name: 'Job Categories' })
        this.WorkShiftsOption = page.getByRole('menuitem', { name: 'Work Shifts' })
    }

    private async clickOnJob() {
        await this.job.click()
    }
    async clickOnJobTitles() {
        await this.clickOnJob()
        await this.jobTitleOption.click()
    }
        async clickOnpayGrades() {
        await this.clickOnJob()
        await this.payGradesOption.click()
    }
    async clickOnEmploymentStatus() {
        await this.clickOnJob()
        await this.EmploymentStatusOption.click()
    }
    async clickOnJobsCategories() {
        await this.clickOnJob()
        await this.JobCategoriesOption.click()
    }
    async clickOnWorkShifts() {
        await this.clickOnJob()
        await this.WorkShiftsOption.click()
    }
}