import { validateLogin, validatePassword } from "../utils/inputHelper"

export function formSubmit(event: Event) {
    event.preventDefault()
    const isLoginValid = validateLogin()
    const isPasswordValid = validatePassword()

    if (!isLoginValid || !isPasswordValid) {
        return
    }

    const form = (document.querySelector('#login-form')) as HTMLFormElement
    const data = new FormData(form)

    for (var pair of Array.from(data)) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // window.location.pathname = 'chat'
}
