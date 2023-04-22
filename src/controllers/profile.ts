import { Block, Input, } from '../components';
import {
    validateDisplayName,
    validateEmail,
    validateFirstName,
    validateLogin,
    validateOldPassword,
    validatePassword,
    validatePhone,
    validateRepeatPassword,
    validateSecondName,
} from '../utils/inputHelper';
import ProfileApi from '../api/profile';

const profileApi = new ProfileApi();

export class ProfileController {
    private _children: Record<string, Block | Block[]>

    constructor(children: Record<string, Block | Block[]>) {
        this.restoreInputs = this.restoreInputs.bind(this)
        this._children = children
        this.changeData = this.changeData.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.restoreInputs = this.restoreInputs.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    changeData(inputs: Input[]) {
        inputs.forEach(input => input.setProps({
            'readOnly': false,
        }));

        (this._children.changeData as Block).hide();
        (this._children.changePassword as Block).hide();
        (this._children.logout as Block).hide();
        (this._children.save as Block).show();
        (this._children.cancel as Block).show();
    }

    changePassword(inputs: Input[], passwordInputs: Input[]) {
        inputs.forEach(input => input.hide())
        passwordInputs.forEach(input => input.setProps({
            'readOnly': false,
        }));

        (this._children.changeData as Block).hide();
        (this._children.changePassword as Block).hide();
        (this._children.logout as Block).hide();
        (this._children.save as Block).show();
        (this._children.cancel as Block).show();
    }

    restoreInputs(inputs: Input[], passwordInputs: Input[]) {
        inputs.forEach(input => {
            input.setProps({
                'readOnly': true,
            })
            input.show()
        });

        passwordInputs.forEach(input => {
            input.setProps({
                'readOnly': true,
            })
            input.hide()
        });

        (this._children.changeData as Block).show();
        (this._children.changePassword as Block).show();
        (this._children.logout as Block).show();
        (this._children.save as Block).hide();
        (this._children.cancel as Block).hide();
    }

    handleSave(inputs: Input[], passwordInputs: Input[]) {
        const isLoginValid = validateLogin()
        const isEmailValid = validateEmail()
        const isFirstNameValid = validateFirstName()
        const isSecondNameValid = validateSecondName()
        const isPhoneValid = validatePhone()
        const isDisplayNameValid = validateDisplayName()
        const isOldPasswordValid = validateOldPassword()
        const isNewPasswordValid = validatePassword()
        const isRepeatPasswordValid = validateRepeatPassword()

        if (!isLoginValid
            || !isEmailValid
            || !isFirstNameValid
            || !isSecondNameValid
            || !isPhoneValid
            || !isDisplayNameValid
            || !isOldPasswordValid
            || !isNewPasswordValid
            || !isRepeatPasswordValid
        ) {
            return
        }

        const form = (document.querySelector('#profile-form')) as HTMLFormElement
        const data = new FormData(form)

        for (const pair of Array.from(data)) {
            // eslint-disable-next-line no-console
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        this.restoreInputs(inputs, passwordInputs)
    }

    async logout() {
        await profileApi.request()
    }
}

