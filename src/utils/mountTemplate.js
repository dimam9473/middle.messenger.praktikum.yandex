import Handlebars from "handlebars"

export default function mountTemplate(rootId, rawTemplate, props = {}) {
    const root = document.getElementById(rootId)

    const template = Handlebars.compile(rawTemplate)

    root.insertAdjacentHTML("beforeend", template())
}
