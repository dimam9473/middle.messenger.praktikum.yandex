export type ContactProps = {
    firstName?: string,
    avatarSrc?: string,
    lastMessage?: string,
    time?: Date,
    unreadCount?: number,
    events?: { [key: string]: Function }
} & Partial<HTMLButtonElement>

