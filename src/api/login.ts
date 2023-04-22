import { BaseAPI, } from './base';
import { LoginProps, } from '../types/login';
import { OptionsWithouMethods, } from '../types/fetch';
import { ResponseStatuses, } from '../constants/responseStatuses';
import { URLS, } from '../constants/url';
import HTTPTransport from './HTTPTransport';

class LoginApi extends BaseAPI {
    private _prepareProps(user: LoginProps): OptionsWithouMethods {
        return {
            'data': JSON.stringify(user),
            'headers': {
                'content-type': 'application/json',
            },
        }
    }

    public async request(user: LoginProps): Promise<string> {
        const request = await HTTPTransport.post(`${URLS.baseUrl}/auth/signin`, this._prepareProps(user));
        const status = request.responseText
        if (status === ResponseStatuses.OK) {
            return String(status);
        } else {
            const { reason, } = JSON.parse(request.responseText)
            return String(reason)
        }
    }
}

export default LoginApi

