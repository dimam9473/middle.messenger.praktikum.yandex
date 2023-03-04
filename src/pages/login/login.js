import Handlebars from "handlebars"
import template from "bundle-text:./login.hbs"

export default function mountLogin() {
    return Handlebars.compile(template)
}