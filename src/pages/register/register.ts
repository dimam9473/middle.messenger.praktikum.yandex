import Block from "../../components/block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { Title } from "../../components/title/title";
import { InputNames } from "../../constants/inputNames";
import { emailFocus, firstNameFocus, loginFocus, phoneFocus, secondNameFocus, validateEmail, validateFirstName, validateLogin, validatePhone, validateSecondName } from "../../utils/inputHelper";

import { registerTemplate } from "./registerTpl";

function formSubmit(event: Event) {
    event.preventDefault()
    const isLoginValid = validateLogin()
    const isEmailValid = validateEmail()
    const isFirstNameValid = validateFirstName()
    const isSecondNameValid = validateSecondName()
    const isPhoneValid = validatePhone()

    // const isPasswordValid = validatePassword()

    if (!isLoginValid || !isEmailValid || !isFirstNameValid || !isSecondNameValid || !isPhoneValid) {
        return
    }

    const form = (document.querySelector('#login-form')) as HTMLFormElement
    const data = new FormData(form)

    for (var pair of Array.from(data)) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // window.location.pathname = 'chat'
}

function initComponents() {
    const title = new Title({
        caption: 'Register account',
    })

    const emailInput = new Input({
        id: InputNames.email,
        name: InputNames.email,
        label: 'Email',
        placeholder: 'mail@mail.com',
        events: {
            focusin: emailFocus,
            focusout: validateEmail
        }
    })

    const loginInput = new Input({
        id: InputNames.login,
        name: InputNames.login,
        label: 'Login',
        placeholder: 'Your login',
        events: {
            focusin: loginFocus,
            focusout: validateLogin
        }
    })

    const firstNameInput = new Input({
        id: InputNames.firstName,
        name: InputNames.firstName,
        label: 'First name',
        placeholder: 'First name',
        events: {
            focusin: firstNameFocus,
            focusout: validateFirstName
        }
    })

    const secondNameInput = new Input({
        id: InputNames.secondName,
        name: InputNames.secondName,
        label: 'Second nam',
        placeholder: 'Your second name',
        events: {
            focusin: secondNameFocus,
            focusout: validateSecondName
        }
    })

    const phoneInput = new Input({
        id: InputNames.phone,
        name: InputNames.phone,
        label: 'Phone',
        placeholder: '+7-999-999-9999',
        events: {
            focusin: phoneFocus,
            focusout: validatePhone
        }
    })

    // const passwordInput = new Input({
    //     id: 'password',
    //     name: 'password',
    //     label: 'Password',
    //     type: 'password',
    //     placeholder: '1234'
    // })

    // const repeatPasswordInput = new Input({
    //     id: 'password-repeat',
    //     name: 'password_repeat',
    //     label: 'Repeat password',
    //     type: 'password',
    //     placeholder: '1234'
    // })

    const button = new Button({
        caption: 'Create account',
        type: 'button',
        className: 'button--green',
        events: { click: formSubmit },
    });

    const link = new Link({
        caption: 'Login',
        href: '/'
    })

    //, passwordInput, repeatPasswordInput
    return { title, emailInput, loginInput, firstNameInput, secondNameInput, phoneInput, button, link }
}

export class Register extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(registerTemplate)
        return template;
    }
}
