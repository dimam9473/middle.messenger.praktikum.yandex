import { Button, } from '../button/button';
import { Input, } from '../input/Input';
import { InputNames, } from '../../constants/inputNames';
import { MessengerController, } from '../../controllers/messenger';
import { MessengerProps, } from '../../types/messenger';
import { attachButtonTemplate, } from '../../templates/attachButtonIconTpl';
import { messageFocus, } from '../../utils/inputHelper';
import { messengerTemplate, } from './messengerTpl';
import Block from '../block/block';

import { ActionType, } from '../../constants/action';
import { Dropdown, } from '../dropdown/dropdown';
import { DropdownProps, } from '../../types/dropdown';
import { Modal, } from '../modal/modal';
import { sendButtonIconTemplate, } from '../../templates/sendButtonIconTpl';

export class Messenger extends Block {
    private _messengerController?: MessengerController
    constructor(props: MessengerProps) {
        super(props);
    }

    protected init(): void {
        this._messengerController = new MessengerController()

        this.children.atachButton = new Button({
            'caption': attachButtonTemplate,
            'className': 'attach-button',
        })

        this.children.messageInput = new Input({
            'id': InputNames.message,
            'name': InputNames.message,
            'placeholder': 'Message',
            'inputWrapper': 'message-wrapper',
            'className': 'message',
            'events': {
                'focusin': messageFocus,
            },
        })

        this.children.sendButton = new Button({
            'caption': sendButtonIconTemplate,
            'className': 'send-button',
            'events': { 'click': this._messengerController.sendMessage, },
        })

        this.children.modal = new Modal({
            'visible': false,
            'actionType': ActionType.none,
            'callback': async (actionType: ActionType, userLogin: string) => {
                if (actionType === ActionType.none) {
                    return
                }

                if (actionType === ActionType.add) {
                    await this._messengerController?.addUserToChat(userLogin, this.props.id)
                    return
                }

                await this._messengerController?.deleteUserFromChat(userLogin, this.props.id);
            },
        })

        const dropdownProps: DropdownProps = {
            'visible': false,
            'options': [
                {
                    'title': 'Add user', 'callback': () => (this.children.modal as Modal).setProps({
                        'visible': true,
                        'actionType': ActionType.add,
                    }),
                },
                {
                    'title': 'Delete user', 'callback': () => (this.children.modal as Modal).setProps({
                        'visible': true,
                        'actionType': ActionType.delete,
                    }),
                },
            ],
        }
        this.children.dropdown = new Dropdown(dropdownProps)

        this.children.showDropdown = new Button({
            'caption': '<span class="mesenger-menu">...</span>',
            'className': 'button-text dropdown-show',
            'events': {
                'click': () => {
                    const visible = (this.children.dropdown as Dropdown).getVisible();
                    (this.children.dropdown as Dropdown).setProps({
                        'visible': !visible,
                    })
                },
            },
        })
    }

    render() {
        return this.compile(messengerTemplate, this.props);
    }
}
