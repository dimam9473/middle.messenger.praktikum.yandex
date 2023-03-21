import Block from "../../components/block/block";
import { Contact } from "../../components/contact/contact";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { InputNames } from "../../constants/inputNames";
import { CONTACTS, USER_INFO } from "../../constants/mockContacts";

import { chatTemplate } from "./chatTpl";

function initComponents() {
    const profile = new Link({
        caption: 'Profile',
        href: 'profile',
        className: 'menu__profile'
    })

    const searchInput = new Input({
        id: InputNames.search,
        name: InputNames.search,
        placeholder: 'Search'
    })

    const contacts: Contact[] = []
    for (const contact of CONTACTS) {
        const userInfo = USER_INFO.find(info => info.id === contact.id)
        contacts.push(new Contact({
            firstName: contact.first_name,
            avatarSrc: contact.avatar,
            lastMessage: userInfo?.lastMessage,
            time: userInfo?.time,
            unreadCount: userInfo?.unreadCount
        }))
    }

    return { searchInput, profile, contacts }
}

export class Chat extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(chatTemplate, this.props)
        return template;
    }
}
