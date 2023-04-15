import { validateUserLogin, } from '../validation/login';
import LoginApi from '../api/login';
import Router from '../routing/router';

interface LoginFormModel {
    email: string;
    password: string;
}

const loginApi = new LoginApi();
const router = new Router();

export class LoginController {
    public async login(data: LoginFormModel) {
        try {
            // Запускаем крутилку

            // const validateData = userLoginValidator(data);

            if (!validateUserLogin()) {
                throw new Error('The data is filled incorrectly');
            }

            const userID = await loginApi.request(data);
            console.log(userID)

            router.go('/chats');

            // Останавливаем крутилку
        } catch (error) {
            // Логика обработки ошибок
        }
    }

    formSubmit(event: Event) {
        event.preventDefault()

        if (!validateUserLogin()) {
            return
        }

        const form = (document.querySelector('#login-form')) as HTMLFormElement
        const data = new FormData(form)

        for (const pair of Array.from(data)) {
            // eslint-disable-next-line no-console
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        window.location.pathname = 'chat'
    }
}
