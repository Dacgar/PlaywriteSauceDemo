import {test as setup, expect} from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage' 

setup('authentication as admin', async({page}) => {
    console.log('Autenticacion iniciada usando el setup')
    //iniciar sesión
    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()
    //nos aseguramos que el inicio de sesion es exitoso
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible
    //guardar el estado
    await page.context().storageState({path: '.auth/admin.json'})

    console.log('Autenticación completada usando el setup')
})