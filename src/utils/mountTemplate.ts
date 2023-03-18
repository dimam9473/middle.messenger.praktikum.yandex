import Handlebars from "handlebars"

export default function mountTemplate<T>(rootId: string, rawTemplate: string, props?: T) {
    const root = document.getElementById(rootId)

    if (!root) {
        console.warn('root was not find')
        return
    }

    const template = Handlebars.compile(rawTemplate)

    root.insertAdjacentHTML("beforeend", template(props))
}
