import "./components"

import mountServerError from "./pages/500/500"
import mountNotFound from "./pages/404/404"
import { Profile } from "./pages/profile/profile"
import { Login } from "./pages/login/login"
import { Register } from "./pages/register/register"
import { Chat } from "./pages/chat/chat"

import { render } from "./utils/render"



window.addEventListener("load", function () {
    if (window.location.pathname === "/") {
        const component = new Login()

        render("#root", component);
        return
    }

    if (window.location.pathname === '/register') {
        const component = new Register()

        render("#root", component);
        return
    }

    if (window.location.pathname === '/chat') {
        const component = new Chat()

        render("#root", component);
        return
    }

    if (window.location.pathname === '/profile') {
        const component = new Profile()

        render("#root", component);
        return
    }

    if (window.location.pathname === '/500') {
        mountServerError('root')
        return
    }

    mountNotFound("root")
})
