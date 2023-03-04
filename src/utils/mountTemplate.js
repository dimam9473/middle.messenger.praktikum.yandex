import Handlebars from "handlebars"

export default function mountTemplate(rootId, rawTemplate) {
    const root = document.getElementById(rootId)

    const template = Handlebars.compile(rawTemplate)

    root.innerHTML = template()
}