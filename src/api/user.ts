import { AuthUserProps, } from '../types/user';
import { BaseAPI, } from './base';
import { URLS, } from '../constants/url';
import { prepareJsonProps, } from '../utils/apiHelper';
import HTTPTransport from './HTTPTransport';

class UserApi extends BaseAPI {
    public async request() {
        const request = await HTTPTransport.get(`${URLS.baseUrl}/auth/user`);
        return request.responseText;
    }

    public async searchUser(userLogin: string) {
        const request = await HTTPTransport.post(`${URLS.baseUrl}/user/search`, prepareJsonProps({ 'login': userLogin, }));
        const updatedUser = (JSON.parse(request.responseText)) as AuthUserProps[]

        if (updatedUser) {
            return updatedUser;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }
}

export default UserApi
