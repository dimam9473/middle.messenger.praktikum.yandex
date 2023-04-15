import { validateRegister, } from '../validation/register';

export class RegisterController {
    formSubmit(event: Event) {
        event.preventDefault()

        if (!validateRegister) {
            return
        }

        const form = (document.querySelector('#register-form')) as HTMLFormElement
        const data = new FormData(form)

        for (const pair of Array.from(data)) {
            // eslint-disable-next-line no-console
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        window.location.pathname = 'chat'
    }
}
