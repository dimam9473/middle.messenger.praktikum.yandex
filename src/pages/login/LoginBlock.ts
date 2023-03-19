import Block from "../../components/block/block";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/Link";
import { Title } from "../../components/title/Title";

import { loginTemplate } from "./loginTpl";

type LoginProps = {
    title: string
}

function initComponents() {
    const button = new Button({
        caption: 'Enter',
        type: 'button',
        events: {
            click: (event: Event) => {
                event.preventDefault()
                event.stopPropagation()
                console.log(event);
            },
        },
    });

    const loginInput = new Input({
        id: 'login',
        name: 'login',
        label: 'Login',
        placeholder: 'Your login'
    })

    const passwordInput = new Input({
        id: 'password',
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '1234'
    })

    const title = new Title({
        caption: 'Sign In',
    })

    const link = new Link({
        caption: 'Create account?',
        href: 'register'
    })

    return { button, loginInput, passwordInput, title, link }
}

export class Login extends Block {
    constructor(props: LoginProps) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(loginTemplate, {
            header: this.props.title,
        })
        return template;
    }
}
