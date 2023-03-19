import Block from "../../components/block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { Title } from "../../components/title/title";

import { registerTemplate } from "./registerTpl";

function initComponents() {
    const title = new Title({
        caption: 'Register account',
    })

    const emailInput = new Input({
        id: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'mail@mail.com'
    })

    const loginInput = new Input({
        id: 'login',
        name: 'login',
        label: 'Login',
        placeholder: 'Your login'
    })

    const firstNameInput = new Input({
        id: 'first-name',
        name: 'first_name',
        label: 'First name',
        placeholder: 'First name'
    })

    const secondNameInput = new Input({
        id: 'second-name',
        name: 'second_name',
        label: 'Second nam',
        placeholder: 'Your second name'
    })

    const phoneInput = new Input({
        id: 'phone',
        name: 'phone',
        label: 'Phone',
        placeholder: '+7-999-999-9999'
    })

    const passwordInput = new Input({
        id: 'password',
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '1234'
    })

    const repeatPasswordInput = new Input({
        id: 'password-repeat',
        name: 'password_repeat',
        label: 'Repeat password',
        type: 'password',
        placeholder: '1234'
    })

    const button = new Button({
        caption: 'Create account',
        type: 'button',
        className: 'button--green',
        events: {
            click: (event: Event) => {
                event.preventDefault()
                window.location.pathname = 'chat'
            },
        },
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
        const template = this.compile(registerTemplate)
        return template;
    }
}
