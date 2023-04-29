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
            'users': [parseInt(responce[0].id),],
            'chatId': chatId,
        }
        return await messengerApi.update(user)
    }

    async deleteUserFromChat(userLogin: string, chatId: number) {
        const user = {
            'users': [0,],
            'chatId': chatId,
        }
        return await messengerApi.delete(user)
    }

    // private async _login(data: LoginProps) {
    //     try {
    //         const response = await loginApi.request(data);

    //         if (response !== ResponseStatuses.OK) {
    //             alert(response)
    //             return
    //         }

    //         const userResponse = JSON.parse(await userApi.request())
    //         if (!(userResponse as AuthUserProps).id) {
    //             alert(userResponse.reason)
    //             return
    //         }

    //         store.set('user', userResponse as AuthUserProps)

    //         // this._router.go('/chat');
    //     } catch (error) {
    //         alert('An unexpected error has occurred')
    //     }
    // }

    sendMessage() {
        const isMessageValid = validateMessage()

        if (!isMessageValid) {
            return
        }

        const input = (document.querySelector(`#${InputNames.message}`) as HTMLInputElement)
        // eslint-disable-next-line no-console
        console.log(input.value)
    }
}

