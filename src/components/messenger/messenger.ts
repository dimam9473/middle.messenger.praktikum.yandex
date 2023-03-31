import { Button, } from '../button/button';
import { Input, } from '../input/Input';
import { InputNames, } from '../../constants/inputNames';
import { MessengerProps, } from '../../types/messenger';
import { attachButtonTemplate, } from '../../templates/attachButtonIconTpl';
import { messageFocus, } from '../../utils/inputHelper';
import { messengerTemplate, } from './messengerTpl';
import { sendMessage, } from '../../controllers/messenger';
import Block from '../block/block';

import { sendButtonIconTemplate, } from '../../templates/sendButtonIconTpl';

export class Messenger extends Block {
    constructor(props: MessengerProps) {
        super(props);
    }

    protected init(): void {
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
            'events': { 'click': sendMessage, },
        })
    }

    render() {
        return this.compile(messengerTemplate, this.props);
    }
}
