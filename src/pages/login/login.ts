import { InputNames, } from '../../constants/inputNames';
import { formSubmit, } from '../../controllers/login';
import { loginFocus, passwordFocus, validateLogin, validatePassword, } from '../../utils/inputHelper';

import { Block, Button, Input, Link, Title, } from '../../components';
import { loginTemplate, } from './loginTpl';

export class Login extends Block {
    constructor(props?: object) {
        super(props);
    }

    protected init(): void {
        this.children.title = new Title({
            'caption': 'Sign In',
        })

        this.children.loginInput = new Input({
            'id': InputNames.login,
            'name': InputNames.login,
            'label': 'Login',
            'placeholder': 'Your login',
            'required': true,
            'events': {
                'focusin': loginFocus,
                'focusout': validateLogin,
            },
        })

        this.children.passwordInput = new Input({
            'id': InputNames.password,
            'name': InputNames.password,
            'label': 'Password',
            'type': 'password',
            'placeholder': '1234',
            'required': true,
            'events': {
                'focusin': passwordFocus,
                'focusout': validatePassword,
            },
        })

        this.children.button = new Button({
            'caption': 'Enter',
            'className': 'button-green',
            'events': { 'click': formSubmit, },
        });

        this.children.link = new Link({
            'caption': 'Create account?',
            'href': 'register',
        })
    }

    render() {
        const template = this.compile(loginTemplate, this.props)
        return template;
    }
}
