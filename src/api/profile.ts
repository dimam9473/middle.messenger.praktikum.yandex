import { BaseAPI, } from './base';
import { URLS, } from '../constants/url';
import HTTPTransport from './HTTPTransport';

class ProfileApi extends BaseAPI {
    public async request() {
        await HTTPTransport.post(`${URLS.baseUrl}/auth/logout`);
    }
}

export default ProfileApi

