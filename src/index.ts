import "./components"

import mountLogin from "./pages/login/login"
import mountRegister from "./pages/register/register"
import mountChat from "./pages/chat/chat"
import mountProfile from "./pages/profile/profile"
import mountServerError from "./pages/500/500"
import mountNotFound from "./pages/404/404"
import { Button } from "./components/button/Button"
import Block from "./components/block/block"
import { Login } from "./pages/login/LoginBlock"

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    const content = block.getContent()

    if (content) {
        root?.appendChild(content);
    }

    return root;
}

const button = new Button({
    caption: 'Click me',
    events: {
        // Названия события точно такие же, как и у первого аргумента addEventListener: 
        // click, mouseEnter, ...
        click: (event: Event) => {
            console.log(event);
        },
    },
});

// const login = new Login({
//     title: 'Sign In',
//     button
// })

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    button.setProps({
        caption: 'Click me, please',
    });
}, 1000);


//enter
window.addEventListener("load", function () {
    if (window.location.pathname === "/") {

        // mountLogin('root')

        render("#root", button);
        return
    }

    if (window.location.pathname === '/register') {
        mountRegister('root')
        return
    }

    if (window.location.pathname === '/chat') {
        mountChat('root')
        return
    }

    if (window.location.pathname === '/profile') {
        mountProfile('root')
        return
    }

    if (window.location.pathname === '/500') {
        mountServerError('root')
        return
    }

    mountNotFound("root")
})
