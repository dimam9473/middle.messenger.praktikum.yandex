export type MessengerProps = {
    id?: number,
    firstName?: string,
    avatarSrc?: string,
    lastMessage?: string,
    time?: Date,
    unreadCount?: number,
    events?: { [key: string]: Function }
    messages?: string,
    // eslint-disable-next-line no-unused-vars
    onSend?: (value: string) => void
} & Partial<HTMLButtonElement>

export type MessengerRequestProps = {
    'users': number[],
    'chatId': number
}

export type UserMessageProps = {
    // login: string
    user_id: number,
    chat_id: number,
    content: string,
    time: Date
}
