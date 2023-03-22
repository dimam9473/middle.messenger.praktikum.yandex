import { Block, Contact, Input, Link, Messenger } from "../../components";
import { InputNames } from "../../constants/inputNames";
import { CONTACTS, USER_INFO } from "../../constants/mockContacts";
import { handleClick } from "../../controllers/chat";

import { chatTemplate } from "./chatTpl";

export class Chat extends Block {
    constructor(props?: object) {
        super(props);
    }

    protected init(): void {
        this.children.profile = new Link({
            caption: 'Profile',
            href: 'profile',
            className: 'menu-profile'
        })

        this.children.searchInput = new Input({
            id: InputNames.search,
            name: InputNames.search,
            placeholder: 'Search'
        })

        this.children.messenger = new Messenger({})

        this.children.contacts = []
        for (const contact of CONTACTS) {
            const userInfo = USER_INFO.find(info => info.id === contact.id)
            const user = {
                firstName: contact.first_name,
                avatarSrc: contact.avatar,
                lastMessage: userInfo?.lastMessage,
                time: userInfo?.time,
                unreadCount: userInfo?.unreadCount,
            }
            this.children.contacts.push(new Contact({
                ...user,
                events: {
                    click: () => handleClick(user, this.children.messenger as Messenger)
                }
            }))
        }
    }

    render() {
        const template = this.compile(chatTemplate, this.props)
        return template;
    }
}
