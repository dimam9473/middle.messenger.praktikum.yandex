import { InputNames, } from '../constants/inputNames'
import { VALIDATION_RULES, } from '../constants/validationRules'

function validate(regexCondition: RegExp, value: string) {
    const regex = new RegExp(regexCondition)

    return regex.test(value)
}

function inputValidate(name: InputNames) {
    const input = document.querySelector(`#${name}`) as HTMLInputElement
    const rule = VALIDATION_RULES[name]

    if (!rule || input.readOnly) {
        return true
    }

    if (!validate(rule, input.value)) {
        input?.classList.add('invalid')
        return false
    }

    return true
}

function inputFocus(id: string) {
    const input = document.querySelector(`#${id}`)
    input?.classList.remove('invalid')
}

export function validateLogin() {
    return inputValidate(InputNames.login)
}

export function validateOldPassword() {
    return inputValidate(InputNames.oldPassword)
}

export function validatePassword() {
    return inputValidate(InputNames.password)
}

export function validateRepeatPassword() {
    const password = document.querySelector(`#${InputNames.password}`) as HTMLInputElement
    const repeatPassword = document.querySelector(`#${InputNames.newPassword}`) as HTMLInputElement
    if (password.value !== repeatPassword.value) {
        repeatPassword?.classList.add('invalid')
        return false
    }

    return true
}

export function validateEmail() {
    return inputValidate(InputNames.email)
}

export function validatePhone() {
    return inputValidate(InputNames.phone)
}

export function validateFirstName() {
    return inputValidate(InputNames.firstName)
}

export function validateSecondName() {
    return inputValidate(InputNames.secondName)
}

export function validateMessage() {
    return inputValidate(InputNames.message)
}

export function validateDisplayName() {
    return inputValidate(InputNames.displayName)
}

export function loginFocus() {
    inputFocus(InputNames.login)
}

export function emailFocus() {
    inputFocus(InputNames.email)
}

export function firstNameFocus() {
    inputFocus(InputNames.firstName)
}

export function secondNameFocus() {
    inputFocus(InputNames.secondName)
}

export function phoneFocus() {
    inputFocus(InputNames.phone)
}

export function oldPasswordFocus() {
    inputFocus(InputNames.oldPassword)
}

export function passwordFocus() {
    inputFocus(InputNames.password)
}

export function repeatPasswordFocus() {
    inputFocus(InputNames.newPassword)
}

export function messageFocus() {
    inputFocus(InputNames.message)
}

export function displayNameFocus() {
    inputFocus(InputNames.displayName)
}
