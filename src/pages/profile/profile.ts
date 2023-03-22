import Block from "../../components/block/block";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";

import { profileTemplate } from "./profileTpl";

function initComponents() {
    const back = new Link({
        caption: 'Back',
        href: 'chat',
        className: 'back'
    })

    const emailInput = new Input({
        id: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'mail@mail.com',
        readonly: true
    })

    const loginInput = new Input({
        id: 'login',
        name: 'login',
        label: 'Login',
        placeholder: 'Your login',
        readonly: true
    })

    const firstNameInput = new Input({
        id: 'first-name',
        name: 'first_name',
        label: 'First name',
        placeholder: 'First name',
        readonly: true
    })

    const secondNameInput = new Input({
        id: 'second-name',
        name: 'second_name',
        label: 'Second nam',
        placeholder: 'Your second name',
        readonly: true
    })

    const phoneInput = new Input({
        id: 'phone',
        name: 'phone',
        label: 'Phone',
        placeholder: '+7-999-999-9999',
        readonly: true
    })

    const changeData = new Link({
        caption: 'Change data',
        href: '#'
    })

    const changePassword = new Link({
        caption: 'Change password',
        href: '#'
    })

    const logout = new Link({
        caption: 'Logout',
        href: '/'
    })

    return { back, emailInput, loginInput, firstNameInput, secondNameInput, phoneInput, changeData, changePassword, logout }
}

export class Profile extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(profileTemplate, this.props)
        return template;
    }
}
