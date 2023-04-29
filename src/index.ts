import { Chat, Login, Profile, Register, ServerError, } from './pages'
import ProfileApi from './api/profile';

import { AuthUserProps, } from './types/user';
import Router from './routing/router';
import UserApi from './api/user';
import store from './store/store';

const profileApi = new ProfileApi();
const userApi = new UserApi();

window.addEventListener('load', async function () {
    const router = new Router();

    const userResponse = JSON.parse(await userApi.request()) as AuthUserProps
    if (userResponse.id) {
        store.set('user', userResponse as AuthUserProps)
    }

    if (window.location.pathname === '/' || window.location.pathname === 'register') {
        userResponse.id && await profileApi.request()
    }

    if (window.location.pathname !== '/' && window.location.pathname !== 'register' && !userResponse.id) {
        router.go('/')
    }

    router
        .use('/', Login)
        .use('/register', Register)
        .use('/chat', Chat)
        .use('/profile', Profile)
        .use('/500', ServerError)
        .start();
})
