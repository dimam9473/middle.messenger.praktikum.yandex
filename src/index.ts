import "./components"

import mountRegister from "./pages/register/register"
import mountChat from "./pages/chat/chat"
import mountProfile from "./pages/profile/profile"
import mountServerError from "./pages/500/500"
import mountNotFound from "./pages/404/404"
import { Login } from "./pages/login/LoginBlock"
import { render } from "./utils/render"


window.addEventListener("load", function () {
    if (window.location.pathname === "/") {
        const login = new Login({
            title: 'Sign In',
        })

        render("#root", login);
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
