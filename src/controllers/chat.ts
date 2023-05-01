import { ChatRequestProps, } from '../types/chat';
import { Messenger, } from '../components/messenger/messenger';
import { Routes, } from '../constants/routes';
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

    async openChat(title: string, messenger: Messenger, chatId: number, userId: number) {
        try {
            const responce = await chatApi.getChatToken(chatId as unknown as number)
            if (typeof responce === 'string') {
                alert(responce)
                return false
            }

            this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${responce.token}`);

            this._socket.addEventListener('open', () => {
                // eslint-disable-next-line no-console
                console.log('Соединение установлено');
                this._socket.send(JSON.stringify({
                    'content': '0',
                    'type': 'get old',
                }));
            });

            this._socket.addEventListener('close', event => {
                if (event.wasClean) {
                    // eslint-disable-next-line no-console
                    console.log('Соединение закрыто чисто');
                } else {
                    // eslint-disable-next-line no-console
                    console.log('Обрыв соединения');
                }

                // eslint-disable-next-line no-console
                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            this._socket.addEventListener('message', event => {
                messenger.setProps({
                    'messages': event.data,
                })
                // eslint-disable-next-line no-console
                console.log('Получены данные', event.data);
            });

            this._socket.addEventListener('error', event => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                // eslint-disable-next-line no-console
                console.log('Ошибка', event.message);
            });

            messenger.setProps({
                'id': chatId,
                'title': title,
                'messages': [],
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(error)
        }
    }

    onSend(value: string) {
        this._socket.send(JSON.stringify({
            'content': value,
            'type': 'message',
        }));
    }

    async loadChats(chatRequest: ChatRequestProps) {
        try {
            const response = await chatApi.request(chatRequest)
            if (typeof response === 'string') {
                alert(response)
                return []
            }

            return response
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(error)
            return []
        }
    }

    async createChat(inputName: string) {
        const title = (document.querySelector(`#${inputName}`) as HTMLInputElement).value

        try {
            const responce = await chatApi.createChat(title)

            if (typeof responce === 'string') {
                alert(responce)
                return null;
            }

            return responce
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(error);
            return null;
        }
    }

    async deleteChat(chatId: number) {
        try {
            const responce = await chatApi.delete(chatId)

            if (typeof responce === 'string') {
                alert(responce)
                return null
            }

            return responce
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(error)
            return null
        }
    }

    redirect() {
        this._router.go(Routes.profile);
    }
}
