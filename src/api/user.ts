import { BaseAPI, } from './base';
import { URLS, } from '../constants/url';
import HTTPTransport from './HTTPTransport';

class UserApi extends BaseAPI {
    public async request() {
        const request = await HTTPTransport.get(`${URLS.baseUrl}/auth/user`);
        return request.responseText;
    }
}

export default UserApi
