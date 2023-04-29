import { ChatUserProps, } from './user'

export type MessageProps = {
    'user': ChatUserProps,
    'time': Date,
    'content': string
}
