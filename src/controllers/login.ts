import { AuthUserProps, } from '../types/user';
import { LoginProps, } from '../types/login';
import { ResponseStatuses, } from '../constants/responseStatuses';
import { validateUserLogin, } from '../validation/login';
import LoginApi from '../api/login';
import Router from '../routing/router';
import UserApi from '../api/user';
import store from '../store/store';

const loginApi = new LoginApi();
const userApi = new UserApi();

export class LoginController {
    private _router
    constructor() {
        this._router = new Router();
        this.formSubmit = this.formSubmit.bind(this)
    }

    private async _login(data: LoginProps) {
        try {
            const response = await loginApi.request(data);

            if (response !== ResponseStatuses.OK) {
                alert(response)
                return
            }

            const userResponse = JSON.parse(await userApi.request())
            if (!(userResponse as AuthUserProps).id) {
                alert(userResponse.reason)
                return
            }

            store.set('user', userResponse as AuthUserProps)

            this._router.go('/chat');
        } catch (error) {
            alert('An unexpected error has occurred')
        }
    }

    async formSubmit(event: Event) {
        event.preventDefault()

        if (!validateUserLogin()) {
            return
        }

        const form = ((event.target as HTMLElement).parentElement) as HTMLFormElement
        const data = new FormData(form)

        const user: Partial<LoginProps> = {}

        for (const pair of Array.from(data)) {
            const propertyName: keyof LoginProps = pair[0].toString() as keyof LoginProps
            user[propertyName] = pair[1].toString()
        }

        await this._login(user as LoginProps)
    }
}
