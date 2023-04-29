import { InputNames, } from '../constants/inputNames'
import { validateMessage, } from '../utils/inputHelper'

import MessengerApi from '../api/messenger';
import UserApi from '../api/user';

const messengerApi = new MessengerApi();
const userApi = new UserApi();

export class MessengerController {
    async addUserToChat(userLogin: string, chatId: number) {
        const responce = await userApi.searchUser(userLogin)

        if (typeof responce === 'string') {
            alert(responce)
            return
        }

        const user = {
            'users': [responce[0].id,],
            'chatId': chatId,
        }
        return await messengerApi.update(user)
    }

    async deleteUserFromChat(userLogin: string, chatId: number) {
        const responce = await userApi.searchUser(userLogin)

        if (typeof responce === 'string') {
            alert(responce)
            return
        }

        const user = {
            'users': [responce[0].id,],
            'chatId': chatId,
        }

        return await messengerApi.delete(user)
    }

    sendMessage() {
        const isMessageValid = validateMessage()

        if (!isMessageValid) {
            return
        }

        return (document.querySelector(`#${InputNames.message}`) as HTMLInputElement).value
    }
}

