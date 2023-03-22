import Block from "../block/block";
import { attachButtonTemplate } from "../../templates/attachButtonIconTpl";
import { Button } from "../button/button";
import { messengerTemplate } from "./messengerTpl";
import { Input } from "../input/Input";
import { sendButtonIconTemplate } from "../../templates/sendButtonIconTpl";
import { messageFocus, validateMessage } from "../../utils/inputHelper";
import { InputNames } from "../../constants/inputNames";

export type MessengerProps = {
    firstName?: string,
    avatarSrc?: string,
    lastMessage?: string,
    time?: Date,
    unreadCount?: number,
    events?: { [key: string]: Function }
} & Partial<HTMLButtonElement>

function sendMessage() {
    const isMessageValid = validateMessage()

    if (!isMessageValid) {
        return
    }

    const input = (document.querySelector(`#${InputNames.message}`) as HTMLInputElement)
    console.log(input.value)
}

export class Messenger extends Block {
    constructor(props: MessengerProps) {
        super(props);
    }

    protected init(): void {
        this.children.atachButton = new Button({
            caption: attachButtonTemplate,
            className: 'attach-button'
        })

        this.children.messageInput = new Input({
            id: InputNames.message,
            name: InputNames.message,
            placeholder: 'Message',
            inputWrapper: 'message-wrapper',
            className: 'message',
            events: {
                focusin: messageFocus,
            }
        })

        this.children.sendButton = new Button({
            caption: sendButtonIconTemplate,
            className: 'send-button',
            events: { click: sendMessage },
        })
    }

    render() {
        return this.compile(messengerTemplate, this.props);
    }
}
