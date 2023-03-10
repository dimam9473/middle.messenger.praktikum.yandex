import mountTemplate from "../../utils/mountTemplate"
import template from "bundle-text:./500.hbs"

export default function mount(rootId) {
    mountTemplate(rootId, template)
}
