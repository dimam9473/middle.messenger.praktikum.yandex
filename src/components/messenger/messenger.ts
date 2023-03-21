import { WEEK_DAYS_SHORT } from "../../constants/weekDays";
import Block from "../block/block";
import { messengerTemplate } from "./mesengerTpl";

export type MessengerProps = {
    firstName?: string,
    avatarSrc?: string,
    lastMessage?: string,
    time?: Date,
    unreadCount?: number,
    events?: { [key: string]: Function }
} & Partial<HTMLButtonElement>

export class Messenger extends Block {
    constructor(props: MessengerProps) {
        super(props);
    }

    render() {
        return this.compile(messengerTemplate, this.props);
    }
}
