import { Chat, Login, Profile, Register, ServerError, } from './pages'
import ProfileApi from './api/profile';

import { AuthUserProps, } from './types/user';
import { Routes, } from './constants/routes';
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

    if (window.location.pathname === Routes.home || window.location.pathname === Routes.register) {
        userResponse.id && await profileApi.request()
    }

    if (window.location.pathname !== Routes.home && window.location.pathname !== Routes.register && !userResponse.id) {
        router.go(Routes.home)
    }

    router
        .use(Routes.home, Login)
        .use(Routes.register, Register)
        .use(Routes.chat, Chat)
        .use(Routes.profile, Profile)
        .use(Routes.serverError, ServerError)
        .start();
})
