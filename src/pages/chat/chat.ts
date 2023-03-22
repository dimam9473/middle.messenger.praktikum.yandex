import Block from "../../components/block/block";
import { Contact, ContactProps } from "../../components/contact/contact";
import { Input } from "../../components/input/Input";
import { Link } from "../../components/link/link";
import { Messenger } from "../../components/messenger/messenger";
import { InputNames } from "../../constants/inputNames";
import { CONTACTS, USER_INFO } from "../../constants/mockContacts";

import { chatTemplate } from "./chatTpl";

// export type ChatProps = {
//     selectedUser:
// }

function handleClick(contact: ContactProps, messenger: Messenger) {
    messenger.setProps({
        firstName: contact.firstName
    })
}

function initComponents() {
    const profile = new Link({
        caption: 'Profile',
        href: 'profile',
        className: 'menu-profile'
    })

    const searchInput = new Input({
        id: InputNames.search,
        name: InputNames.search,
        placeholder: 'Search'
    })

    const messenger = new Messenger({})

    const contacts: Contact[] = []
    for (const contact of CONTACTS) {
        const userInfo = USER_INFO.find(info => info.id === contact.id)
        const user = {
            firstName: contact.first_name,
            avatarSrc: contact.avatar,
            lastMessage: userInfo?.lastMessage,
            time: userInfo?.time,
            unreadCount: userInfo?.unreadCount,
        }
        contacts.push(new Contact({
            ...user,
            events: {
                click: () => handleClick(user, messenger)
            }
        }))
    }

    return { searchInput, profile, contacts, messenger }
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
