import { AuthUserProps, Passwords, UserUpdateProps, } from '../types/user';
import { BaseAPI, } from './base';
import { ResponseStatuses, } from '../constants/responseStatuses';
import { URLS, } from '../constants/url';
import { prepareFileProps, prepareJsonProps, } from '../utils/apiHelper';
import HTTPTransport from './HTTPTransport';

class ProfileApi extends BaseAPI {
    public async request() {
        await HTTPTransport.post(`${URLS.base}/auth/logout`);
    }

    public async update(user: UserUpdateProps) {
        const request = await HTTPTransport.put(`${URLS.base}/user/profile`, prepareJsonProps(user));
        const updatedUser = (JSON.parse(request.responseText)) as AuthUserProps

        if (updatedUser) {
            return updatedUser;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }

    public async updateAvatar(avatar: File) {
        const formData = new FormData();
        formData.append('avatar', avatar);

        const request = await HTTPTransport.put(`${URLS.base}/user/profile/avatar`, prepareFileProps(formData));
        const updatedUser = (JSON.parse(request.responseText)) as AuthUserProps

        if (updatedUser) {
            return updatedUser;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }

    public async updatePassword(passwords: Passwords) {
        const request = await HTTPTransport.put(`${URLS.base}/user/password`, prepareJsonProps(passwords));

        const status = request.responseText
        if (status === ResponseStatuses.OK) {
            return String(status);
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }
}

export default ProfileApi

