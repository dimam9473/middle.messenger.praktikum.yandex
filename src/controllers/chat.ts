import { ChatRequestProps, } from '../types/chat';
import { Messenger, } from '../components/messenger/messenger';
import { MessengerProps, } from '../types/messenger';
import ChatApi from '../api/chat';
import Router from '../routing/router';

const chatApi = new ChatApi();

export class ChatController {
    private _router
    private _socket!: WebSocket

    constructor() {
        this._router = new Router();
        this.onSend = this.onSend.bind(this)
    }

    async openChat(contact: MessengerProps, messenger: Messenger, chatId: number, userId: number) {
        const responce = await chatApi.getChatToken(chatId as unknown as number)
        if (typeof responce === 'string') {
            alert(responce)
            return false
        }

        this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${responce.token}`);

        this._socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this._socket.send(JSON.stringify({
                'content': '0',
                'type': 'get old',
            }));
        });

        this._socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this._socket.addEventListener('message', event => {
            messenger.setProps({
                'messages': event.data,
            })
            console.log('Получены данные', event.data);
        });

        this._socket.addEventListener('error', event => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            console.log('Ошибка', event.message);
        });

        messenger.setProps({
            'id': chatId,
            'firstName': contact.firstName,
            'messages': [],
        })
    }

    onSend(value: string) {
        this._socket.send(JSON.stringify({
            'content': value,
            'type': 'message',
        }));
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
