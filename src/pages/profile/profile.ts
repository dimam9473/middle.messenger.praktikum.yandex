
import { Block, Input, Link } from "../../components";
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
            id: 'email',
            name: 'email',
            label: 'Email',
            placeholder: 'mail@mail.com',
            readonly: true
        })

        this.children.loginInput = new Input({
            id: 'login',
            name: 'login',
            label: 'Login',
            placeholder: 'Your login',
            readonly: true
        })

        this.children.firstNameInput = new Input({
            id: 'first-name',
            name: 'first_name',
            label: 'First name',
            placeholder: 'First name',
            readonly: true
        })

        this.children.secondNameInput = new Input({
            id: 'second-name',
            name: 'second_name',
            label: 'Second nam',
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
