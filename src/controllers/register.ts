// import { validateRegister, } from '../validation/register';

import { UserProps, } from '../types/user';
import { validateRegister, } from '../validation/register';
import RegisterApi from '../api/register';
import Router from '../routing/router';

const registerApi = new RegisterApi();

export class RegisterController {
    private _router

    constructor() {
        this.formSubmit = this.formSubmit.bind(this)
        this._router = new Router();
    }

    private async registerUser(user: UserProps) {
        const userID = await registerApi.create(user);

        if (userID) {
            this._router.go('/chat');
        }
    }

    async formSubmit(event: Event) {
        event.preventDefault()

        if (!validateRegister()) {
            return
        }

        const form = ((event.target as HTMLElement).parentElement) as HTMLFormElement
        // const form = (document.querySelector('#register-form')) as HTMLFormElement
        const data = new FormData(form)
        const user: Partial<UserProps> = {}

        for (const pair of Array.from(data)) {
            // eslint-disable-next-line no-console
            const propertyName: keyof UserProps = pair[0].toString() as keyof UserProps
            user[propertyName] = pair[1].toString()
        }

        await this.registerUser(user as UserProps)
    }

    redirect() {
        this._router.go('/');
    }
}
