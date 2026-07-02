import process from "process"

export class Enviroment {
    //se leen las variables de entorno desde el archivo de confirguracion
    //Se usa la clase Enviroment para obtener las variables de entorno necesarias para la ejecución de las pruebas
    static readonly ADMIN_USERNAME = Enviroment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Enviroment.getRequired('ADMIN_PASSWORD')
    static readonly EMPLOYEE_USERNAME = Enviroment.getRequired('EMPLOYEE_USERNAME')
    static readonly EMPLOYEE_PASSWORD = Enviroment.getRequired('EMPLOYEE_PASSWORD')
    //se toma del archivo de configuracion la variable de entorno ADMIN_USERNAME y ADMIN_PASSWORD, si no existe se lanza un error
    private static getRequired(key: string): string {
        const value = process.env[key]
        if (!value) {
            throw new Error('Environment variable' + key + 'does not exist')
            }

        return value
    }
}