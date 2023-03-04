import mountLogin from "./pages/login/login"
import mountRegister from "./pages/register/register"

window.addEventListener("load", function () {
    const root = document.getElementById("root")
    let template = ''

    if (window.location.pathname === "/") {
        template = mountLogin()
    }

    if (window.location.pathname === '/register') {
        template = mountRegister()
    }

    if (window.location.pathname === '/chat') {
        template = mountRegister()
    }

    root.innerHTML = template()
})