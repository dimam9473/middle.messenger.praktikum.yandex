import mountTemplate from "../../utils/mountTemplate"
import { notFoundTemplate } from "./404Tpl"

export default function mount(rootId) {
    mountTemplate(rootId, notFoundTemplate)
}
