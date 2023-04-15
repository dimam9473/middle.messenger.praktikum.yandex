import { BaseAPI, } from './base';
import HTTPTransport from './HTTPTransport';

type LoginRequest = {}

type LoginResponse = {
    user_id: string
}

class LoginApi extends BaseAPI {
    public async request(user: LoginRequest) {
        const { user_id, } = (await HTTPTransport.post('/login', user) as LoginResponse);
        return user_id;
    }
}

export default LoginApi

