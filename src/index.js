import mountLogin from "./pages/login/login"
import mountRegister from "./pages/register/register"
import mountChat from "./pages/chat/chat"
import mountProfile from "./pages/profile/profile"
import mountServerError from "./pages/500/500"
import mountNotFound from "./pages/404/404"

window.addEventListener("load", function () {
    if (window.location.pathname === "/") {
        mountLogin('root')
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