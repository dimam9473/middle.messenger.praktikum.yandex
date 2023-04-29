export type MessengerProps = {
    id?: number,
    firstName?: string,
    avatarSrc?: string,
    lastMessage?: string,
    time?: Date,
    unreadCount?: number,
    events?: { [key: string]: Function }
} & Partial<HTMLButtonElement>

export type MessengerRequestProps = {
    'users': number[],
    'chatId': number
}
