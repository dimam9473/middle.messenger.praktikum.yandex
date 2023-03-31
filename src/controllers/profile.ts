import { Block, Input, } from '../components';
import { Profile, } from '../pages';
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

export function changeData(this: Profile, inputs: Input[]) {
    inputs.forEach(input => input.setProps({
        'readOnly': false,
    }));

    (this.children.changeData as Block).hide();
    (this.children.changePassword as Block).hide();
    (this.children.logout as Block).hide();
    (this.children.save as Block).show();
    (this.children.cancel as Block).show();
}

export function changePassword(this: Profile, inputs: Input[], passwordInputs: Input[]) {
    inputs.forEach(input => input.hide())
    passwordInputs.forEach(input => input.setProps({
        'readOnly': false,
    }));

    (this.children.changeData as Block).hide();
    (this.children.changePassword as Block).hide();
    (this.children.logout as Block).hide();
    (this.children.save as Block).show();
    (this.children.cancel as Block).show();
}

export function restoreInputs(this: Profile, inputs: Input[], passwordInputs: Input[]) {
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

    (this.children.changeData as Block).show();
    (this.children.changePassword as Block).show();
    (this.children.logout as Block).show();
    (this.children.save as Block).hide();
    (this.children.cancel as Block).hide();
}

export function handleSave(this: Profile, inputs: Input[], passwordInputs: Input[]) {
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

    restoreInputs.call(this, inputs, passwordInputs)
}
