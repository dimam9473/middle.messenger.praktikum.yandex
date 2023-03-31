import { validateEmail, validateFirstName, validateLogin, validatePassword, validatePhone, validateRepeatPassword, validateSecondName, } from '../utils/inputHelper'

export function formSubmit(event: Event) {
    event.preventDefault()
    const isLoginValid = validateLogin()
    const isEmailValid = validateEmail()
    const isFirstNameValid = validateFirstName()
    const isSecondNameValid = validateSecondName()
    const isPhoneValid = validatePhone()
    const isPasswordValid = validatePassword()
    const isRepeatPasswordValid = validateRepeatPassword()

    if (!isLoginValid || !isEmailValid || !isFirstNameValid || !isSecondNameValid || !isPhoneValid || !isPasswordValid || !isRepeatPasswordValid) {
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
