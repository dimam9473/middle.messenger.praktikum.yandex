import { BaseAPI, } from './base';
import { OptionsWithouMethods, XHRData, } from '../types/fetch';
import { URLS, } from '../constants/url';
import HTTPTransport from './HTTPTransport';

type LoginRequest = {
    login: string;
    password: string;
}

type LoginResponse = {
    user_id: string
}

class LoginApi extends BaseAPI {
    private _prepareUser(user: LoginRequest): OptionsWithouMethods {
        return { 'data': user as unknown as XHRData, }
    }

    public async request(user: LoginRequest) {
        // const { user_id, } = (await HTTPTransport.post(`${URLS.basuUrl}/auth/user`, this._prepareUser(user)) as LoginResponse);
        const request = await HTTPTransport.post(`${URLS.basuUrl}/auth/signin`, this._prepareUser(user));
        const { user_id, } = request as LoginResponse

        return user_id;
    }
}

export default LoginApi

