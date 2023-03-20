import Block from "../../components/block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { Title } from "../../components/title/title";

import { loginTemplate } from "./loginTpl";

enum InputNames {
    loginInput = 'login',
    passwordInput = 'password'
}

const validateForm = (form: HTMLFormElement) => {
    let formData = new FormData(form);
    let login = formData.get('login');
    console.log(login)
    // window.location.pathname = 'chat'
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
            focusin: () => {
                console.log('focusin')
            },
            focusout: () => {
                console.log('focusout')
            }
        }
    })

    const passwordInput = new Input({
        id: 'password',
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '1234',
        required: true
    })

    const button = new Button({
        caption: 'Enter',
        className: 'button--green',
        events: {
            click: (event: Event) => {
                event.preventDefault()
                const form = document.getElementById('login-form')
                if (!form) {
                    return
                }

                validateForm(form as HTMLFormElement)
            }
        },
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
