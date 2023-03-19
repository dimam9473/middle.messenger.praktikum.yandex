import "./components"

import mountChat from "./pages/chat/chat"
import mountProfile, { Profile } from "./pages/profile/profile"
import mountServerError from "./pages/500/500"
import mountNotFound from "./pages/404/404"
import { Login } from "./pages/login/login"
import { Register } from "./pages/register/register"

import { render } from "./utils/render"


window.addEventListener("load", function () {
    if (window.location.pathname === "/") {
        const login = new Login()

        render("#root", login);
        return
    }

    if (window.location.pathname === '/register') {
        const register = new Register()

        render("#root", register);
        return
    }

    if (window.location.pathname === '/chat') {
        mountChat('root')
        return
    }

    if (window.location.pathname === '/profile') {
        mountProfile('root')
        const profile = new Profile()

        render("#root", profile);
        return
    }

    if (window.location.pathname === '/500') {
        mountServerError('root')
        return
    }

    mountNotFound("root")
})
