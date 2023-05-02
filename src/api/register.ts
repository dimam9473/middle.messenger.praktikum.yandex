import { BaseAPI, } from './base';
import { URLS, } from '../constants/url';
import { UserProps, } from '../types/user';
import { prepareJsonProps, } from '../utils/apiHelper';
import HTTPTransport from './HTTPTransport';

class RegisterApi extends BaseAPI {
    public async create(user: UserProps) {
        const request = await HTTPTransport.post(`${URLS.base}/auth/signup`, prepareJsonProps(user));
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

