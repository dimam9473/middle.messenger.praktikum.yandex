import { InputNames } from "../constants/inputNames"
import { VALIDATION_RULES } from "../constants/validationRules"

function validate(regexCondition: RegExp, value: string) {
    const regex: RegExp = new RegExp(regexCondition)

    return regex.test(value)
}

function inputValidate(id: string, rule: RegExp) {
    const input = document.querySelector(`#${id}`) as HTMLInputElement
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
    return inputValidate(InputNames.login, VALIDATION_RULES.login)
}

export function validatePassword() {
    return inputValidate(InputNames.password, VALIDATION_RULES.password)
}

export function validateEmail() {
    return inputValidate(InputNames.email, VALIDATION_RULES.email)
}

export function validatePhone() {
    return inputValidate(InputNames.phone, VALIDATION_RULES.phone)
}

export function validateFirstName() {
    return inputValidate(InputNames.firstName, VALIDATION_RULES.name)
}

export function validateSecondName() {
    return inputValidate(InputNames.secondName, VALIDATION_RULES.name)
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

export function passwordFocus() {
    inputFocus(InputNames.password)
}
