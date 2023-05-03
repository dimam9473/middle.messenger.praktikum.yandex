import { MessageProps, } from './message'

export type ChatRequestProps = {
    offset: number
    limit: number
    title?: string
}

export type ChatProps = {
    'id': number
    'title': string,
    'avatar': string,
    'unread_count': number,
    'last_message': MessageProps,
    deleteChat: () => void,
    events?: { [key: string]: Function }
}

export type ChatResponceProps = {
    chatId: string
}

export type ChatTokeResponceProps = {
    token: string
}
