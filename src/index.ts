import { Chat, Login, Profile, Register, ServerError, } from './pages'

import Router from './routing/router';

window.addEventListener('load', function () {
    const router = new Router('#root');

    router
        .use('/', Login)
        .use('/register', Register)
        .use('/chat', Chat)
        .use('/profile', Profile)
        .use('/500', ServerError)
        .start();
})
