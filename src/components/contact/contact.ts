import { WEEK_DAYS_SHORT } from "../../constants/weekDays";
import Block from "../block/block";
import { contactTemplate } from "./contactTpl";

export type ContactProps = {
    firstName?: string,
    avatarSrc?: string,
    lastMessage?: string,
    time?: Date,
    unreadCount?: number,
    events?: { [key: string]: Function }
} & Partial<HTMLButtonElement>

function prepareDate(time: Date) {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDay()

    if (currentYear === time.getFullYear() && currentMonth === time.getMonth() && currentDay === time.getDay()) {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (today.getFullYear() > time.getFullYear()) {
        return time.toLocaleString([], { day: "2-digit", month: 'long', year: 'numeric' });
    }

    return WEEK_DAYS_SHORT[time.getDay()];

}

export class Contact extends Block {
    constructor(props: ContactProps) {
        super(props);
    }

    render() {
        const { time, ...restProps } = this.props as ContactProps

        const prepairedDate = time ? prepareDate(time) : ''

        return this.compile(contactTemplate, { ...restProps, time: prepairedDate });
    }
}
