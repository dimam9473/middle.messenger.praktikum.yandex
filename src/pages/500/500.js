import mountTemplate from "../../utils/mountTemplate"
import { serverErrorTemplate } from "./500Tpl"

export default function mount(rootId) {
    mountTemplate(rootId, serverErrorTemplate)
}
