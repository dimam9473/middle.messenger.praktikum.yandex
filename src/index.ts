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

// Необходимо оставить в силу особенностей тренажёра
// history.pushState({}, '', '/');

// const router = new Router('.app');

// // Можно обновиться на /user и получить сразу пользователя
// router
//     .use('/', Login)
//     .use('/users', Profile)
//     .start();

// // Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//     router.go('/users');
// }, 1000);

// // А можно и назад
// setTimeout(() => {
//     router.back();
// }, 3000);

// // И снова вперёд
// setTimeout(() => {
//     router.forward();
// }, 5000);
