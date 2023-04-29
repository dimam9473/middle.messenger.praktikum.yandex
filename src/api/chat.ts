import { BaseAPI, } from './base';
import { ChatProps, ChatRequestProps, ChatResponceProps, } from '../types/chat';
import { URLS, } from '../constants/url';
import { prepareJsonProps, } from '../utils/apiHelper';
import HTTPTransport from './HTTPTransport';

class ChatApi extends BaseAPI {
    async request(chatRequest: ChatRequestProps) {
        const request = await HTTPTransport.get(`${URLS.baseUrl}/chats`, prepareJsonProps(chatRequest));
        const chatsdUser = (JSON.parse(request.responseText)) as ChatProps[]

        if (chatsdUser) {
            return chatsdUser;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }

    async createChat(title: string) {
        const request = await HTTPTransport.post(`${URLS.baseUrl}/chats`, prepareJsonProps({ title, }));
        const chatId = (JSON.parse(request.responseText)) as ChatResponceProps[]

        if (chatId) {
            return chatId;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }
}

export default ChatApi
