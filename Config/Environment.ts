const environmentVariables = (globalThis as typeof globalThis & {
    process?: { env: Record<string, string | undefined> }
}).process?.env ?? {}

export class Environment {
    //se leen las variables de entorno desde el archivo de confirguracion
    //Se usa la clase Environment para obtener las variables de entorno necesarias para la ejecución de las pruebas
    static readonly ADMIN_USERNAME = Environment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Environment.getRequired('ADMIN_PASSWORD')
    static readonly EMPLOYEE_USERNAME = Environment.getRequired('EMPLOYEE_USERNAME')
    static readonly EMPLOYEE_PASSWORD = Environment.getRequired('EMPLOYEE_PASSWORD')
    //se toma del archivo de configuracion la variable de entorno ADMIN_USERNAME y ADMIN_PASSWORD, si no existe se lanza un error
    private static getRequired(key: string): string {
        const value = environmentVariables[key]
        if (!value) {
            throw new Error('Environment variable' + key + 'does not exist')
            }

        return value
    }
}