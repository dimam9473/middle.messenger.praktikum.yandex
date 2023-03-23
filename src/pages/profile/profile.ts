
import { Block, Input, Link } from "../../components";
import { InputNames } from "../../constants/inputNames";
import { profileTemplate } from "./profileTpl";

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
            readonly: true
        })

        this.children.loginInput = new Input({
            id: InputNames.login,
            name: InputNames.login,
            label: 'Login',
            placeholder: 'Your login',
            readonly: true
        })

        this.children.displayNameInput = new Input({
            id: InputNames.displayName,
            name: InputNames.displayName,
            label: 'Display name',
            placeholder: 'Your display name',
            readonly: true
        })

        this.children.firstNameInput = new Input({
            id: InputNames.firstName,
            name: InputNames.firstName,
            label: 'First name',
            placeholder: 'First name',
            readonly: true
        })

        this.children.secondNameInput = new Input({
            id: InputNames.secondName,
            name: InputNames.secondName,
            label: 'Second name',
            placeholder: 'Your second name',
            readonly: true
        })

        this.children.phoneInput = new Input({
            id: 'phone',
            name: 'phone',
            label: 'Phone',
            placeholder: '+7-999-999-9999',
            readonly: true
        })

        this.children.changeData = new Link({
            caption: 'Change data',
            href: '#'
        })

        this.children.changePassword = new Link({
            caption: 'Change password',
            href: '#'
        })

        this.children.logout = new Link({
            caption: 'Logout',
            href: '/'
        })
    }

    render() {
        const template = this.compile(profileTemplate, this.props)
        return template;
    }
}
