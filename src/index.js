import mountLogin from "./pages/login/login"

window.addEventListener("load", function () {
    const root = document.getElementById("root")
    let template = ''

    if (window.location.pathname === "/") {
        template = mountLogin()
    }

    const test = template()
    root.innerHTML = test
})