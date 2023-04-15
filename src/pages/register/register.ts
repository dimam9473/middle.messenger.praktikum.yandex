import { Block, Button, Input, Link, Title, } from '../../components';

import { InputNames, } from '../../constants/inputNames';
import { RegisterController, } from '../../controllers/register';
import {
    emailFocus,
    firstNameFocus,
    loginFocus,
    passwordFocus,
    phoneFocus,
    repeatPasswordFocus,
    secondNameFocus,
    validateEmail,
    validateFirstName,
    validateLogin,
    validatePassword,
    validatePhone,
    validateRepeatPassword,
    validateSecondName,
} from '../../utils/inputHelper';

import { registerTemplate, } from './registerTpl';

const registerController = new RegisterController()

export class Register extends Block {
    constructor(props?: object) {
        super(props);
    }

    protected init(): void {
        this.children.title = new Title({
            'caption': 'Register account',
        })

        this.children.emailInput = new Input({
            'id': InputNames.email,
            'name': InputNames.email,
            'label': 'Email',
            'placeholder': 'mail@mail.com',
            'events': {
                'focusin': emailFocus,
                'focusout': validateEmail,
            },
        })

        this.children.loginInput = new Input({
            'id': InputNames.login,
            'name': InputNames.login,
            'label': 'Login',
            'placeholder': 'Your login',
            'events': {
                'focusin': loginFocus,
                'focusout': validateLogin,
            },
        })

        this.children.firstNameInput = new Input({
            'id': InputNames.firstName,
            'name': InputNames.firstName,
            'label': 'First name',
            'placeholder': 'First name',
            'events': {
                'focusin': firstNameFocus,
                'focusout': validateFirstName,
            },
        })

        this.children.secondNameInput = new Input({
            'id': InputNames.secondName,
            'name': InputNames.secondName,
            'label': 'Second nam',
            'placeholder': 'Your second name',
            'events': {
                'focusin': secondNameFocus,
                'focusout': validateSecondName,
            },
        })

        this.children.phoneInput = new Input({
            'id': InputNames.phone,
            'name': InputNames.phone,
            'label': 'Phone',
            'placeholder': '+7-999-999-9999',
            'events': {
                'focusin': phoneFocus,
                'focusout': validatePhone,
            },
        })

        this.children.passwordInput = new Input({
            'id': InputNames.password,
            'name': InputNames.password,
            'label': 'Password',
            'type': 'password',
            'placeholder': '1234',
            'events': {
                'focusin': passwordFocus,
                'focusout': validatePassword,
            },
        })

        this.children.repeatPasswordInput = new Input({
            'id': InputNames.repeatPassword,
            'name': InputNames.repeatPassword,
            'label': 'Repeat password',
            'type': 'password',
            'placeholder': '1234',
            'events': {
                'focusin': repeatPasswordFocus,
                'focusout': validateRepeatPassword,
            },
        })

        this.children.button = new Button({
            'caption': 'Create account',
            'type': 'button',
            'className': 'button-green',
            'events': { 'click': registerController.formSubmit, },
        });

        this.children.link = new Link({
            'caption': 'Login',
            'href': '/',
        })
    }

    render() {
        const template = this.compile(registerTemplate, this.props)
        return template;
    }
}
