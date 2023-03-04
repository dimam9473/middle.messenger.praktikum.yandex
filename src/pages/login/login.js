import Handlebars from "handlebars"
import loginTemplate from "bundle-text:./login.hbs"

export default function mountLogin() {
    const compiledTamplate = Handlebars.compile(loginTemplate)

    return compiledTamplate
}