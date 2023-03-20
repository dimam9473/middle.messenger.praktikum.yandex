import Block from "../../components/block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { Title } from "../../components/title/title";

import { loginTemplate } from "./loginTpl";

const VALIDATION_RULES = {
    loginRule: '^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$',
    passwordRule: '^(?=.*[0-9])(?=.*[А-ЯA-Z])[а-яА-ЯёЁa-zA-Z0-9!@#$%^&*]{8,20}$'
}

enum InputNames {
    loginInput = 'login',
    passwordInput = 'password'
}

function validate(regexCondition: string, value: string) {
    const regex: RegExp = new RegExp(regexCondition)

    return regex.test(value)
}

function formSubmit(event: Event) {
    event.preventDefault()
    const isLoginValid = validateLogin()
    const isPasswordValid = validatePassword()
    if (!isLoginValid || !isPasswordValid) {
        return
    }

    window.location.pathname = 'chat'
}

function loginFocus() {
    const input = document.querySelector(`#${InputNames.loginInput}`)
    input?.classList.remove('invalid')
}

function validateLogin() {
    const input = document.querySelector(`#${InputNames.loginInput}`) as HTMLInputElement
    if (!validate(VALIDATION_RULES.loginRule, input.value)) {
        input?.classList.add('invalid')
        return false
    }

    return true
}

function passwordFocus() {
    const input = document.querySelector(`#${InputNames.passwordInput}`)
    input?.classList.remove('invalid')
}

function validatePassword() {
    const input = document.querySelector(`#${InputNames.passwordInput}`) as HTMLInputElement
    if (!validate(VALIDATION_RULES.passwordRule, input.value)) {
        input?.classList.add('invalid')
        return false
    }

    return true
}

function initComponents() {
    const title = new Title({
        caption: 'Sign In',
    })

    const loginInput = new Input({
        id: 'login',
        name: 'login',
        label: 'Login',
        placeholder: 'Your login',
        required: true,
        events: {
            focusin: loginFocus,
            focusout: validateLogin
        }
    })

    const passwordInput = new Input({
        id: 'password',
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '1234',
        required: true,
        events: {
            focusin: passwordFocus,
            focusout: validatePassword
        }
    })

    const button = new Button({
        caption: 'Enter',
        className: 'button--green',
        events: { click: formSubmit },
    });

    const link = new Link({
        caption: 'Create account?',
        href: 'register'
    })

    return { title, loginInput, passwordInput, button, link }
}

export class Login extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(loginTemplate)
        return template;
    }
}
