import { UserModel } from "../models/UserModel";

export class UserFactory {
    private static defaultPassword = "Password123!"

    private static base(overrides?: Partial<UserModel>): UserModel {

        const defaults: UserModel = {
            userName: 'user-' + crypto.randomUUID().slice(0, 30),
            employeeName: 'Default employee',
            password: this.defaultPassword,
            ConfirmPassword: this.defaultPassword,
            role: 'ESS',
            status: 'Enabled'
        };
        return { ...defaults, ...(overrides || {}) };
    }
    static createEmployeeEss(overrides?: Partial<UserModel>) {
        return this.base({ role: 'ESS', ...(overrides || {}) })
    }
    static createAdmin(overrides?: Partial<UserModel>) {
        return this.base({ role: 'Admin', ...(overrides || {}) })
    }
    static createDisabledAdmin(overrides?: Partial<UserModel>) {
        return this.base({ role: 'Admin', status: 'Disabled', ...(overrides || {}) })
    }
}
