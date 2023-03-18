import mountTemplate from "../../utils/mountTemplate"
import { profileTemplate } from "./profileTpl"

export default function mount(rootId: string) {
    mountTemplate(rootId, profileTemplate)
}
