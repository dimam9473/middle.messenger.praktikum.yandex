import { AuthUserProps, UserUpdateProps, } from '../types/user';
import { BaseAPI, } from './base';
import { URLS, } from '../constants/url';
import { prepareFileProps, prepareJsonProps, } from '../utils/apiHelper';
import HTTPTransport from './HTTPTransport';

class ProfileApi extends BaseAPI {
    public async request() {
        await HTTPTransport.post(`${URLS.baseUrl}/auth/logout`);
    }

    public async update(user: UserUpdateProps) {
        const request = await HTTPTransport.put(`${URLS.baseUrl}/user/profile`, prepareJsonProps(user));
        const updatedUser = (JSON.parse(request.responseText)) as AuthUserProps
        if (updatedUser) {
            return updatedUser;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }

    public async updateAvatar(avatar: File) {
        const form = document.querySelector('#myUserForm') as HTMLFormElement
        const formData = new FormData(form);

        // formData.append('avatar', avatar);

        const request = await HTTPTransport.put(`${URLS.baseUrl}/user/profile/avatar`, prepareFileProps(formData));
        const updatedUser = (JSON.parse(request.responseText)) as AuthUserProps
        if (updatedUser) {
            return updatedUser;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }
}

export default ProfileApi

