import { Block, Contact, Input, Link, Messenger, } from '../../components';
import { CONTACTS, USER_INFO, } from '../../constants/mockContacts';
import { ChatController, } from '../../controllers/chat';
import { InputNames, } from '../../constants/inputNames';

import { chatTemplate, } from './chatTpl';

export class Chat extends Block {
    private _chatController?: ChatController

    constructor(props?: object) {
        super(props);
    }

    protected init(): void {
        this._chatController = new ChatController()

        this.children.profile = new Link({
            'caption': 'Profile',
            'href': '#',
            'className': 'menu-profile',
            'events': {
                'click': (event: Event) => this.redirect(event),
            },
        })

        this.children.searchInput = new Input({
            'id': InputNames.search,
            'name': InputNames.search,
            'placeholder': 'Search',
        })

        this.children.messenger = new Messenger({})

        this.children.contacts = []
        for (const contact of CONTACTS) {
            const userInfo = USER_INFO.find(info => info.id === contact.id)
            const user = {
                'firstName': contact.first_name,
                'avatarSrc': contact.avatar,
                'lastMessage': userInfo?.lastMessage,
                'time': userInfo?.time,
                'unreadCount': userInfo?.unreadCount,
            }
            this.children.contacts.push(new Contact({
                ...user,
                'events': {
                    'click': () => this._chatController?.handleClick(user, this.children.messenger as Messenger),
                },
            }))
        }
    }

    render() {
        const template = this.compile(chatTemplate, this.props)
        return template;
    }

    redirect(event: Event) {
        event.preventDefault()
        this._chatController?.redirect()
    }
}
