import { validateLogin, validatePassword, } from '../utils/inputHelper'

export const validateUserLogin = () => {
    const isLoginValid = validateLogin()
    const isPasswordValid = validatePassword()

    return isLoginValid && isPasswordValid
}
