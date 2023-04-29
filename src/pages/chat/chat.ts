import { Block, Button, Contact, Input, Link, Messenger, } from '../../components';
import { ChatController, } from '../../controllers/chat';
import { InputNames, } from '../../constants/inputNames';

import { chatTemplate, } from './chatTpl';

export class Chat extends Block {
    private _chatController?: ChatController

    protected init() {
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

        this.children.chatNameInput = new Input({
            'id': 'chatNameInput',
            'name': 'chatNameInput',
            'placeholder': 'Chat name to create',
        })

        this.children.createChat = new Button({
            'caption': '+',
            'className': 'button-green button-small',
            'events': { 'click': async () => await this._chatController?.createChat('chatNameInput'), },
        })

        this.children.messenger = new Messenger({})
    }

    protected async componentDidMount() {
        const chats = await this._chatController?.loadChats({ 'offset': 0, 'limit': 10, })
        if (!chats) {
            return
        }

        this.children.contacts = []
        for (const chat of chats) {
            const user = {
                'firstName': chat.last_message?.user.first_name ?? chat.title,
                'avatarSrc': chat.avatar ?? '',
                'lastMessage': chat.last_message?.content ?? '',
                'time': chat.last_message?.time ?? new Date(),
                'unreadCount': chat.unread_count,
            }
            this.children.contacts.push(new Contact({
                ...user,
                'events': {
                    'click': () => this._chatController?.handleClick({ 'id': chat.id, ...user, }, this.children.messenger as Messenger),
                },
            }))
        }
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
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
