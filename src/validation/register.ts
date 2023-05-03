import { validateEmail, validateFirstName, validateLogin, validatePassword, validatePhone, validateRepeatPassword, validateSecondName, } from '../utils/inputHelper'

export const validateRegister = () => {
    const isLoginValid = validateLogin()
    const isEmailValid = validateEmail()
    const isFirstNameValid = validateFirstName()
    const isSecondNameValid = validateSecondName()
    const isPhoneValid = validatePhone()
    const isPasswordValid = validatePassword()
    const isRepeatPasswordValid = validateRepeatPassword()

    return isLoginValid && isEmailValid && isFirstNameValid && isSecondNameValid && isPhoneValid && isPasswordValid && isRepeatPasswordValid
}
