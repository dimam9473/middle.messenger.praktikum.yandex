import mountTemplate from "../../utils/mountTemplate"
import { chatTemplate } from "./chatTpl"

export default function mount(rootId: string) {
    mountTemplate(rootId, chatTemplate)
}
