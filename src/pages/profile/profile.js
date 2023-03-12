import mountTemplate from "../../utils/mountTemplate"
import { profileTemplate } from "./profileTpl"

export default function mount(rootId) {
    mountTemplate(rootId, profileTemplate)
}
