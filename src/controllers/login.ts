import { validateUserLogin, } from '../validation/login';
import LoginApi from '../api/login';
import Router from '../routing/router';

interface LoginFormModel {
    login: string;
    password: string;
}

const loginApi = new LoginApi();

export class LoginController {
    private _router
    constructor() {
        this._router = new Router();
        this.formSubmit = this.formSubmit.bind(this)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _login(data: LoginFormModel) {
        try {
            // Запускаем крутилку

            const userID = await loginApi.request(data);
            console.log(userID)
            if (!userID) {
                throw new Error('User was not found')
            }

            this._router.go('/chat');
            // Останавливаем крутилку
        } catch (error) {
            // Логика обработки ошибок
        }
    }

    async formSubmit(event: Event) {
        event.preventDefault()

        // if (!validateUserLogin()) {
        //     return
        // }

        // const form = ((event.target as HTMLElement).parentElement) as HTMLFormElement
        // const data = new FormData(form)

        // const user: Partial<LoginFormModel> = {}

        // for (const pair of Array.from(data)) {
        //     const propertyName: keyof LoginFormModel = pair[0].toString() as keyof LoginFormModel
        //     user[propertyName] = pair[1].toString()
        // }
        const defaultUser: LoginFormModel = { 'login': 'practicum', 'password': 'p@ssw0rdOa1', }
        await this._login(defaultUser as LoginFormModel)
    }
}
