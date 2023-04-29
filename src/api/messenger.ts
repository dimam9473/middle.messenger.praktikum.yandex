import { BaseAPI, } from './base';
import { MessengerRequestProps, } from '../types/messenger';
import { ResponseStatuses, } from '../constants/responseStatuses';
import { URLS, } from '../constants/url';
import { prepareJsonProps, } from '../utils/apiHelper';
import HTTPTransport from './HTTPTransport';

class MessengerApi extends BaseAPI {
    public async update(user: MessengerRequestProps) {
        const request = await HTTPTransport.put(`${URLS.baseUrl}/chats/users`, prepareJsonProps(user));
        const status = request.responseText

        if (status === ResponseStatuses.OK) {
            return String(status);
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }

    async delete(user: MessengerRequestProps) {
        const request = await HTTPTransport.delete(`${URLS.baseUrl}/chats/users`, prepareJsonProps(user));
        const status = request.responseText

        if (status === ResponseStatuses.OK) {
            return String(status);
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }
}

export default MessengerApi
