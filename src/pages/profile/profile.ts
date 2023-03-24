
import { Block, Button, Input, Link, Text } from "../../components";
import { InputNames } from "../../constants/inputNames";
import { changeData, changePassword, handleSave, restoreInputs } from "../../controllers/profile";
import {
    displayNameFocus,
    emailFocus,
    firstNameFocus,
    loginFocus,
    oldPasswordFocus,
    passwordFocus,
    phoneFocus,
    repeatPasswordFocus,
    secondNameFocus,
    validateDisplayName,
    validateEmail,
    validateFirstName,
    validateLogin,
    validateOldPassword,
    validatePassword,
    validatePhone,
    validateRepeatPassword,
    validateSecondName
} from "../../utils/inputHelper";

import { profileTemplate } from "./profileTpl";

let inputs: Input[] = []
let passwordInputs: Input[] = []

export class Profile extends Block {
    constructor(props?: object) {
        super(props);
    }

    protected init(): void {
        this.children.back = new Link({
            caption: 'Back',
            href: 'chat',
            className: 'back'
        })

        this.children.emailInput = new Input({
            id: InputNames.email,
            name: InputNames.email,
            label: 'Email',
            placeholder: 'mail@mail.com',
            readOnly: true,
            events: {
                focusin: emailFocus,
                focusout: validateEmail
            }
        })

        this.children.loginInput = new Input({
            id: InputNames.login,
            name: InputNames.login,
            label: 'Login',
            placeholder: 'Your login',
            readOnly: true,
            events: {
                focusin: loginFocus,
                focusout: validateLogin
            }
        })

        this.children.displayNameInput = new Input({
            id: InputNames.displayName,
            name: InputNames.displayName,
            label: 'Display name',
            placeholder: 'Your display name',
            readOnly: true,
            events: {
                focusin: displayNameFocus,
                focusout: validateDisplayName
            }
        })

        this.children.firstNameInput = new Input({
            id: InputNames.firstName,
            name: InputNames.firstName,
            label: 'First name',
            placeholder: 'First name',
            readOnly: true,
            events: {
                focusin: firstNameFocus,
                focusout: validateFirstName
            }
        })

        this.children.secondNameInput = new Input({
            id: InputNames.secondName,
            name: InputNames.secondName,
            label: 'Second name',
            placeholder: 'Your second name',
            readOnly: true,
            events: {
                focusin: secondNameFocus,
                focusout: validateSecondName
            }
        })

        this.children.phoneInput = new Input({
            id: 'phone',
            name: 'phone',
            label: 'Phone',
            placeholder: '+7-999-999-9999',
            readOnly: true,
            events: {
                focusin: phoneFocus,
                focusout: validatePhone
            }
        })

        this.children.oldPasswordInput = new Input({
            id: InputNames.oldPassword,
            name: InputNames.oldPassword,
            label: 'Old password',
            type: 'password',
            placeholder: '1234',
            readOnly: true,
            events: {
                focusin: oldPasswordFocus,
                focusout: validateOldPassword
            }
        })

        this.children.newPasswordInput = new Input({
            id: InputNames.password,
            name: InputNames.password,
            label: 'New password',
            type: 'password',
            placeholder: '1234',
            readOnly: true,
            events: {
                focusin: passwordFocus,
                focusout: validatePassword
            }
        })

        this.children.repeatPasswordInput = new Input({
            id: InputNames.repeatPassword,
            name: InputNames.repeatPassword,
            label: 'Repeat new password',
            type: 'password',
            placeholder: '1234',
            readOnly: true,
            events: {
                focusin: repeatPasswordFocus,
                focusout: validateRepeatPassword
            }
        })

        inputs = [
            this.children.emailInput as Input,
            this.children.loginInput as Input,
            this.children.displayNameInput as Input,
            this.children.firstNameInput as Input,
            this.children.secondNameInput as Input,
            this.children.phoneInput as Input
        ]

        passwordInputs = [
            this.children.oldPasswordInput as Input,
            this.children.newPasswordInput as Input,
            this.children.repeatPasswordInput as Input,
        ]

        this.children.changePassword = new Text({
            text: 'Change password',
            className: 'clickable-text',
            events: {
                click: () => this.changePassword(),
            }
        })

        this.children.save = new Button({
            caption: 'Save',
            type: 'button',
            className: 'save button--green',
            events: { click: () => this.handleSave() },
        });

        this.children.logout = new Link({
            caption: 'Logout',
            href: '/',
            className: 'clickable-text'
        })

        this.children.changeData = new Text({
            text: 'Change data',
            className: 'clickable-text',
            events: {
                click: () => this.changeData(),
            }
        })

        this.children.cancel = new Text({
            text: 'Cancel',
            className: 'clickable-text cancel',
            events: {
                click: () => this.cancel(),
            }
        })

        this.hideComponents()
    }

    hideComponents() {
        (this.children.oldPasswordInput as Block).hide();
        (this.children.newPasswordInput as Block).hide();
        (this.children.repeatPasswordInput as Block).hide();
        (this.children.save as Block).hide();
        (this.children.cancel as Block).hide();
    }

    changePassword() {
        changePassword.call(this, inputs, passwordInputs)
    }

    handleSave() {
        handleSave.call(this, inputs, passwordInputs)
    }

    cancel() {
        restoreInputs.call(this, inputs, passwordInputs)
    }

    changeData() {
        changeData.call(this, inputs)
    }

    render() {
        const template = this.compile(profileTemplate, this.props)
        return template;
    }
}
