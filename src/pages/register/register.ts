import Block from "../../components/block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { Title } from "../../components/title/title";
import { InputNames } from "../../constants/inputNames";
import { emailFocus, firstNameFocus, loginFocus, passwordFocus, phoneFocus, repeatPasswordFocus, secondNameFocus, validateEmail, validateFirstName, validateLogin, validatePassword, validatePhone, validateRepeatPassword, validateSecondName } from "../../utils/inputHelper";
import { formSubmit } from "./controller";

import { registerTemplate } from "./registerTpl";

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

    const passwordInput = new Input({
        id: InputNames.password,
        name: InputNames.password,
        label: 'Password',
        type: 'password',
        placeholder: '1234',
        events: {
            focusin: passwordFocus,
            focusout: validatePassword
        }
    })

    const repeatPasswordInput = new Input({
        id: InputNames.repeatPassword,
        name: InputNames.repeatPassword,
        label: 'Repeat password',
        type: 'password',
        placeholder: '1234',
        events: {
            focusin: repeatPasswordFocus,
            focusout: validateRepeatPassword
        }
    })

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

    return { title, emailInput, loginInput, firstNameInput, secondNameInput, phoneInput, passwordInput, repeatPasswordInput, button, link }
}

export class Register extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(registerTemplate, this.props)
        return template;
    }
}
