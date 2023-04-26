import { Avatar, Block, Button, Input, Link, Text, } from '../../components';
import { InputNames, } from '../../constants/inputNames';
import { ProfileController, } from '../../controllers/profile';
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
    validateSecondName,
} from '../../utils/inputHelper';
import store, { StoreEvents, } from '../../store/store';

import { AuthUserProps, } from '../../types/user';
import { UpdateType, } from '../../constants/updateType';
import { connect, } from '../../store/connect';
import { profileTemplate, } from './profileTpl';
import Router from '../../routing/router';

let inputs: Input[] = []
let passwordInputs: Input[] = []
let selectedUpdateType: UpdateType | null = null

class Profile extends Block {
    private _profileController?: ProfileController
    private _router

    constructor(props?: object) {
        super(props);

        this._router = new Router();

        store.on(StoreEvents.Updated, () => {
            const state = store.getState()
            this.setProps({ ...state, });
        });

        this.hideComponents = this.hideComponents.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.cancel = this.cancel.bind(this)
        this.changeData = this.changeData.bind(this)
        this.changeAvatar = this.changeAvatar.bind(this)
    }

    protected init(): void {
        this._profileController = new ProfileController()

        const user = this.props.user as AuthUserProps

        this.children.back = new Link({
            'caption': 'Back',
            'href': 'chat',
            'className': 'back',
        })

        this.children.avatar = new Avatar({
            'src': user?.avatar ?? '',
            'events': {
                'click': () => {
                    const fileUploader = (document.querySelector(`#${InputNames.fileUploader}`) as HTMLInputElement)
                    fileUploader.click()
                },
            },
        })

        this.children.fileUploader = new Input({
            'id': InputNames.fileUploader,
            'name': InputNames.fileUploader,
            'className': 'file-uploader',
            'type': 'file',
            'events': {
                'change': (event: Event) => {
                    this.changeAvatar(event)
                },
            },
        })

        this.children.emailInput = new Input({
            'id': InputNames.email,
            'name': InputNames.email,
            'value': user?.email ?? '',
            'label': 'Email',
            'placeholder': 'mail@mail.com',
            'readOnly': true,
            'events': {
                'focusin': emailFocus,
                'focusout': validateEmail,
            },
        })

        this.children.loginInput = new Input({
            'id': InputNames.login,
            'name': InputNames.login,
            'value': user?.login ?? '',
            'label': 'Login',
            'placeholder': 'Your login',
            'readOnly': true,
            'events': {
                'focusin': loginFocus,
                'focusout': validateLogin,
            },
        })

        this.children.displayNameInput = new Input({
            'id': InputNames.displayName,
            'name': InputNames.displayName,
            'value': user?.display_name ?? '',
            'label': 'Display name',
            'placeholder': 'Your display name',
            'readOnly': true,
            'events': {
                'focusin': displayNameFocus,
                'focusout': validateDisplayName,
            },
        })

        this.children.firstNameInput = new Input({
            'id': InputNames.firstName,
            'name': InputNames.firstName,
            'value': user?.first_name ?? '',
            'label': 'First name',
            'placeholder': 'First name',
            'readOnly': true,
            'events': {
                'focusin': firstNameFocus,
                'focusout': validateFirstName,
            },
        })

        this.children.secondNameInput = new Input({
            'id': InputNames.secondName,
            'name': InputNames.secondName,
            'value': user?.second_name ?? '',
            'label': 'Second name',
            'placeholder': 'Your second name',
            'readOnly': true,
            'events': {
                'focusin': secondNameFocus,
                'focusout': validateSecondName,
            },
        })

        this.children.phoneInput = new Input({
            'id': 'phone',
            'name': 'phone',
            'label': 'Phone',
            'value': user?.phone ?? '',
            'placeholder': '+7-999-999-9999',
            'readOnly': true,
            'events': {
                'focusin': phoneFocus,
                'focusout': validatePhone,
            },
        })

        this.children.oldPasswordInput = new Input({
            'id': InputNames.oldPassword,
            'name': InputNames.oldPassword,
            'label': 'Old password',
            'type': 'password',
            'placeholder': '1234',
            'readOnly': true,
            'events': {
                'focusin': oldPasswordFocus,
                'focusout': validateOldPassword,
            },
        })

        this.children.newPasswordInput = new Input({
            'id': InputNames.password,
            'name': InputNames.password,
            'label': 'New password',
            'type': 'password',
            'placeholder': '1234',
            'readOnly': true,
            'events': {
                'focusin': passwordFocus,
                'focusout': validatePassword,
            },
        })

        this.children.repeatPasswordInput = new Input({
            'id': InputNames.repeatPassword,
            'name': InputNames.repeatPassword,
            'label': 'Repeat new password',
            'type': 'password',
            'placeholder': '1234',
            'readOnly': true,
            'events': {
                'focusin': repeatPasswordFocus,
                'focusout': validateRepeatPassword,
            },
        })

        inputs = [
            this.children.emailInput as Input,
            this.children.loginInput as Input,
            this.children.displayNameInput as Input,
            this.children.firstNameInput as Input,
            this.children.secondNameInput as Input,
            this.children.phoneInput as Input,
        ]

        passwordInputs = [
            this.children.oldPasswordInput as Input,
            this.children.newPasswordInput as Input,
            this.children.repeatPasswordInput as Input,
        ]

        this.children.changePassword = new Text({
            'text': 'Change password',
            'className': 'clickable-text',
            'events': {
                'click': () => this.changePassword(),
            },
        })

        this.children.save = new Button({
            'caption': 'Save',
            'type': 'button',
            'className': 'save button-green',
            'events': { 'click': (event: Event) => this.handleSave(event), },
        });

        this.children.logout = new Link({
            'caption': 'Logout',
            'href': '#',
            'className': 'clickable-text',
            'events': {
                'click': (event: Event) => this.logout.call(this, event),
            },
        })

        this.children.changeData = new Text({
            'text': 'Change data',
            'className': 'clickable-text',
            'events': {
                'click': () => this.changeData(),
            },
        })

        this.children.cancel = new Text({
            'text': 'Cancel',
            'className': 'clickable-text cancel',
            'events': {
                'click': () => this.cancel(),
            },
        })

        this.hideComponents()
    }

    protected componentDidUpdate(_oldProps: any, _newProps: any): boolean {
        if (_oldProps !== _newProps) {
            (this.children.emailInput as Block).setProps({
                'value': _newProps.user.email,
            });

            (this.children.loginInput as Block).setProps({
                'value': _newProps.user.login,
            });

            (this.children.displayNameInput as Block).setProps({
                'value': _newProps.user.display_name,
            });

            (this.children.firstNameInput as Block).setProps({
                'value': _newProps.user.first_name,
            });

            (this.children.secondNameInput as Block).setProps({
                'value': _newProps.user.second_name,
            });

            (this.children.phoneInput as Block).setProps({
                'value': _newProps.user.phone,
            })

            return true
        }

        return false
    }

    logout(event: Event) {
        event.preventDefault()
        this._profileController?.logout()
        this._router.go('/');
    }

    hideComponents() {
        (this.children.oldPasswordInput as Block).hide();
        (this.children.newPasswordInput as Block).hide();
        (this.children.repeatPasswordInput as Block).hide();
        (this.children.save as Block).hide();
        (this.children.cancel as Block).hide();
    }

    changePassword() {
        selectedUpdateType = UpdateType.Password
        this._profileController?.changePassword.call(this, inputs, passwordInputs)
    }

    handleSave(event: Event) {
        event.preventDefault()
        if (selectedUpdateType === null) {
            return
        }

        this._profileController?.handleSave(selectedUpdateType)
        this._profileController?.restoreInputs.call(this, inputs, passwordInputs)
    }

    cancel() {
        selectedUpdateType = null
        this._profileController?.restoreInputs.call(this, inputs, passwordInputs)
    }

    changeData() {
        selectedUpdateType = UpdateType.Data
        this._profileController?.changeData.call(this, inputs)
    }

    changeAvatar(event: Event) {
        const files = (event.target as HTMLInputElement)?.files
        if (!files) {
            return
        }

        this._profileController?.changeAvatar(files[0])
    }

    render() {
        const template = this.compile(profileTemplate, this.props)
        return template;
    }
}

function mapUserToProps(state: Record<string, unknown>) {
    return {
        'user': state.user,
    };
}

export default connect(mapUserToProps)(Profile)
