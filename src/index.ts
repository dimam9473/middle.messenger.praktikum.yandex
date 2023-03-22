import "./components"

import Block from "./components/block/block"
import { NotFoundError } from "./pages/404/404"
import { Profile } from "./pages/profile/profile"
import { Login } from "./pages/login/login"
import { Register } from "./pages/register/register"
import { Chat } from "./pages/chat/chat"
import { ServerError } from "./pages/500/500"

import { render } from "./utils/render"

window.addEventListener("load", function () {
    let component: Block
    switch (window.location.pathname) {
        case '/': {
            component = new Login()
            break
        }
        case '/register': {
            component = new Register()
            break
        }
        case '/chat': {
            component = new Chat()
            break
        }
        case '/profile': {
            component = new Profile()
            break
        }
        case '/500': {
            component = new ServerError()
            break
        }
        default: {
            component = new NotFoundError()
        }
    }

    render("#root", component)
})
