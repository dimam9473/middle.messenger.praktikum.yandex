import { BaseAPI, } from './base';
import { OptionsWithouMethods, } from '../types/fetch';
import { URLS, } from '../constants/url';
import { UserProps, } from '../types/user';
import HTTPTransport from './HTTPTransport';

class RegisterApi extends BaseAPI {
    private _prepareProps(user: UserProps): OptionsWithouMethods {
        return {
            'data': JSON.stringify(user),
            'headers': {
                'content-type': 'application/json',
            },
        }
    }

    public async create(user: UserProps) {
        const request = await HTTPTransport.post(`${URLS.baseUrl}/auth/signup`, this._prepareProps(user));
        const { id, } = JSON.parse(request.responseText)
        if (id) {
            return id;
        } else {
            const { reason, } = JSON.parse(request.responseText)
            alert(reason)
        }
    }
}

export default RegisterApi

