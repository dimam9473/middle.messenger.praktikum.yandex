import { Block, Button, Contact, Input, Link, Messenger, } from '../../components';
import { ChatController, } from '../../controllers/chat';
import { InputNames, } from '../../constants/inputNames';
import { chatTemplate, } from './chatTpl';
import { connect, } from '../../store/connect';
import store, { StoreEvents, } from '../../store/store';

class Chat extends Block {
    private _chatController?: ChatController

    constructor(props?: object) {
        super(props)

        store.on(StoreEvents.Updated, () => {
            const state = store.getState()
            this.setProps({ ...state, });
        });
    }

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
            'events': {
                'click': async () => {
                    await this._chatController?.createChat('chatNameInput')
                    this.dispatchComponentDidMount()
                },
            },
        })

        this.children.messenger = new Messenger({
            'onSend': this._chatController.onSend,
        })
    }

    protected async componentDidMount() {
        const chats = await this._chatController?.loadChats({ 'offset': 0, 'limit': 10, })
        if (!chats) {
            return
        }

        this.children.contacts = []
        for (const chat of chats) {
            const deleteChat = () => {
                this._chatController?.deleteChat(chat.id)
                this.dispatchComponentDidMount()
            }
            this.children.contacts.push(new Contact({
                ...chat,
                deleteChat,
                'events': {
                    'click': async () =>
                        await this._chatController?.openChat(
                            chat.title,
                            this.children.messenger as Messenger,
                            chat.id,
                            this.props.user.id
                        ),
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

function mapUserToProps(state: Record<string, unknown>) {
    return {
        'user': state.user,
    };
}

export default connect(mapUserToProps)(Chat)
