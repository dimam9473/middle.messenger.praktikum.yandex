import Block from "../../components/block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { Title } from "../../components/title/title";
import { InputNames } from "../../constants/inputNames";
import { loginFocus, passwordFocus, validateLogin, validatePassword } from "../../utils/inputHelper";
import { formSubmit } from "./controller";

import { loginTemplate } from "./loginTpl";

function initComponents() {
    const title = new Title({
        caption: 'Sign In',
    })

    const loginInput = new Input({
        id: InputNames.login,
        name: InputNames.login,
        label: 'Login',
        placeholder: 'Your login',
        required: true,
        events: {
            focusin: loginFocus,
            focusout: validateLogin
        }
    })

    const passwordInput = new Input({
        id: InputNames.password,
        name: InputNames.password,
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
        const template = this.compile(loginTemplate, this.props)
        return template;
    }
}
