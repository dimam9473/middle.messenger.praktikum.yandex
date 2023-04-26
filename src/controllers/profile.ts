import { Block, Input, } from '../components';
import { UpdateType, } from '../constants/updateType';
import { UserUpdateProps, } from '../types/user';
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
import store from '../store/store';

const profileApi = new ProfileApi();

export class ProfileController {
    changeData(this: Block, inputs: Input[]) {
        inputs.forEach(input => input.setProps({
            'readOnly': false,
        }));

        (this.children.changeData as Block).hide();
        (this.children.changePassword as Block).hide();
        (this.children.logout as Block).hide();
        (this.children.save as Block).show();
        (this.children.cancel as Block).show();
    }

    changeAvatar(avatar: File) {
        profileApi.updateAvatar(avatar)
    }

    changePassword(this: Block, inputs: Input[], passwordInputs: Input[]) {
        inputs.forEach(input => input.hide())
        passwordInputs.forEach(input => {
            input.show()
            input.setProps({
                'readOnly': false,
            })
        });

        (this.children.changeData as Block).hide();
        (this.children.changePassword as Block).hide();
        (this.children.logout as Block).hide();
        (this.children.save as Block).show();
        (this.children.cancel as Block).show();
    }

    restoreInputs(this: Block, inputs: Input[], passwordInputs: Input[]) {
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

    async handleSave(selectedUpdateType: UpdateType) {
        let invalid = false

        if (selectedUpdateType === UpdateType.Data) {
            const isLoginValid = validateLogin()
            const isEmailValid = validateEmail()
            const isFirstNameValid = validateFirstName()
            const isSecondNameValid = validateSecondName()
            const isPhoneValid = validatePhone()
            const isDisplayNameValid = validateDisplayName()
            invalid = !isLoginValid
                || !isEmailValid
                || !isFirstNameValid
                || !isSecondNameValid
                || !isPhoneValid
                || !isDisplayNameValid
        }

        if (selectedUpdateType === UpdateType.Password) {
            const isOldPasswordValid = validateOldPassword()
            const isNewPasswordValid = validatePassword()
            const isRepeatPasswordValid = validateRepeatPassword()
            invalid = !isOldPasswordValid
                || !isNewPasswordValid
                || !isRepeatPasswordValid
        }

        if (invalid) {
            return
        }

        const form = (document.querySelector('#profile-form')) as HTMLFormElement
        const data = new FormData(form)
        const user: UserUpdateProps = {
            'display_name': '',
            'email': '',
            'first_name': '',
            'second_name': '',
            'login': '',
            'phone': '',
        }

        for (const pair of Array.from(data)) {
            // eslint-disable-next-line no-console
            const propertyName: keyof UserUpdateProps = pair[0].toString() as keyof UserUpdateProps
            if (propertyName in user) {
                user[propertyName] = pair[1].toString()
            }
        }

        const userResponse = await profileApi.update(user as UserUpdateProps)

        if (typeof userResponse === 'string') {
            alert(userResponse)
        }

        userResponse && store.set('user', userResponse)
    }

    async logout() {
        await profileApi.request()
    }
}

