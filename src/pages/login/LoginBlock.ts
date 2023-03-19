import Block from "../../components/block/block";
import { Button } from "../../components/button/Button";

import { loginTemplate } from "./loginTpl";

type LoginProps = {
    title: string
    button?: Button
}


//> button id="enter" caption="Enter" class="button--green"
export class Login extends Block {
    constructor(props: LoginProps) {
        // Создаём враппер дом-элемент button
        super(props);
    }

    render() {
        // // В проекте должен быть ваш собственный шаблонизатор
        // //return `<div>${this.props.title}</div>`;
        // const content = this.compile(loginTemplate, { title: this.props.title })
        // return content ? content({ title: this.props.title, button: this.props.button }) : null;
        const template = this.compile(loginTemplate, {
            title: this.props.title,
            button: this.children?.button,
        })
        return template;
    }
}


// export const loginTemplate: string = `<div class="form-layout">
//     <section class="form-wrapper">
//         {{> title title="{{title}}"}}
//         <form>
//             <div class="inputs">
//                 {{> input id="login" name="login" label="Login" placeholder="Your login"}}
//                 {{> input id="password" name="password" label="Password" type="password" placeholder="1234"}}
//             </div>
//             {{{button}}}
//         </form>

//         {{> link href="register" text="Create account?"}}
//     </section>
// </div>
// `
