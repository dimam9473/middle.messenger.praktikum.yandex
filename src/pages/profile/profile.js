import mountTemplate from "../../utils/mountTemplate"
import template from "bundle-text:./profile.hbs"

export default function mount(rootId) {
    mountTemplate(rootId, template)
}
