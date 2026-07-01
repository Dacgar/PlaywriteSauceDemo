import {test, expect} from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage'

test('Check left menu options', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()

    console.log('Current menu items count', currentMenuItemsCount)

    const currentMenuItems: string[] = []

    for (let i=0; i<currentMenuItemsCount; i++){
        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItems.push(menuText)
        }

    console.log(currentMenuItems)

    // Validar primer elemento
    expect(currentMenuItems[0]).toBe('Admin')
    
    const expectedMenuItems =[
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz',
    ];

    expect(currentMenuItems).toEqual(expectedMenuItems)

})

test('Navigate through the left panel', async({page})=>{
    test.setTimeout(60000);

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()

    for (let i=0; i<currentMenuItemsCount; i++){
        const menuItem = leftMenuItems.nth(i)
        const menuText = await menuItem.innerText()

        console.log('Current menu item',menuText)

        await menuItem.click()

        if (menuText === 'Maintenance'){
            //await menuItem.click()
            await page.goBack()
            continue
        }
    }
})

test ('Check all the qualifications links', async({page})=>{
    test.setTimeout(60000);

    const expectedPages = [
        {
            menu: 'Skills',
            url:'/web/index.php/admin/viewSkills'
            
        },
        {
            menu:'Education',
            url:'/web/index.php/admin/viewEducation'
        },
        {
            menu:'Licenses',
            url:'/web/index.php/admin/viewLicenses'
        },
                {
            menu:'Languages',
            url:'/web/index.php/admin/viewLanguages'
        },
                {
            menu:'Memberships',
            url:'/web/index.php/admin/membership'
        }
    ]
    //test.setTimeout(60000);

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    //navegar y buscar opción por texto
    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

    const qualificationsOptions = page.getByRole('menu').locator('li')

    for(let expectedPage of expectedPages){
        const menuOption = qualificationsOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp (expectedPage.url))

        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()
    }
})

test ('Check all the jobs links', async({page})=>{
    test.setTimeout(60000);
    const expectedPages = [
        {
            menu: 'Job Titles',
            url:'/web/index.php/admin/viewJobTitleList'
            
        },
        {
            menu:'Pay Grades',
            url:'/web/index.php/admin/viewPayGrades'
        },
        {
            menu:'Employment Status',
            url:'/web/index.php/admin/employmentStatus'
        },
                {
            menu:'Job Categories',
            url:'/web/index.php/admin/jobCategory'
        },
                {
            menu:'Work Shifts',
            url:'/web/index.php/admin/workShift'
        }
    ]
    //test.setTimeout(60000);

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    //navegar y buscar opción por texto
    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job').click()

    const jobsOptions = page.getByRole('menu').locator('li')

    for(let expectedPage of expectedPages){
        const menuOption = jobsOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp (expectedPage.url))

        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job').click()
    }
})