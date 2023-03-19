import Block from "../../components/block/block";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

import { loginTemplate } from "./loginTpl";

type LoginProps = {
    title: string
}

function initComponents() {
    const button = new Button({
        caption: 'Click me',
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

    return { button, loginInput, passwordInput }
}

export class Login extends Block {
    constructor(props: LoginProps) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(loginTemplate, {
            header: this.props.title,
            // button: this?.button,
        })
        return template;
    }
}
