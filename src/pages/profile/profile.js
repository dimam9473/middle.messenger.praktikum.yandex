import mountTemplate from "../../utils/mountTemplate"
import template from "bundle-text:./profile.hbs"
import { profileTemplate } from "./profileTpl"

export default function mount(rootId) {
    mountTemplate(rootId, profileTemplate)
}
