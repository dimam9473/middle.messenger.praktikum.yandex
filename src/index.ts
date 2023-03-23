import Block from "./components/block/block"
import { Chat, Login, NotFoundError, Profile, Register, ServerError } from "./pages"

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
    component.dispatchComponentDidMount()
})
