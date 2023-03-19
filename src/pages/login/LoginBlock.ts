import Block from "../../components/block/block";
import { Button } from "../../components/button/Button";

import { loginTemplate } from "./loginTpl";

type LoginProps = {
    title: string
    button?: Button
}

export class Login extends Block {
    constructor(props: LoginProps) {
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
        props.button = button
        super(props);
    }

    render() {
        const template = this.compile(loginTemplate, {
            header: this.props.title,
            button: this.children?.button,
        })
        return template;
    }
}
