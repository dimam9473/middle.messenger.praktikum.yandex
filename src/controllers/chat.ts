import { ChatRequestProps, } from '../types/chat';
import { Messenger, } from '../components/messenger/messenger';
import { MessengerProps, } from '../types/messenger';
import ChatApi from '../api/chat';
import Router from '../routing/router';

const chatApi = new ChatApi();

export class ChatController {
    private _router

    constructor() {
        this._router = new Router();
    }

    handleClick(contact: MessengerProps, messenger: Messenger) {
        messenger.setProps({
            'id': contact.id,
            'firstName': contact.firstName,
        })
    }

    async loadChats(chatRequest: ChatRequestProps) {
        const response = await chatApi.request(chatRequest)
        if (typeof response === 'string') {
            alert(response)
            return []
        }

        return response
    }

    async createChat(inputName: string) {
        const title = (document.querySelector(`#${inputName}`) as HTMLInputElement).value

        const responce = await chatApi.createChat(title)

        if (typeof responce === 'string') {
            alert(responce)
            return null
        }

        return responce
    }

    redirect() {
        this._router.go('/profile');
    }
}
