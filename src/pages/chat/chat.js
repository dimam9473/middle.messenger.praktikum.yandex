import mountTemplate from "../../utils/mountTemplate"
import template from "bundle-text:./chat.hbs"

export default function mount(rootId) {
    mountTemplate(rootId, template)
}
