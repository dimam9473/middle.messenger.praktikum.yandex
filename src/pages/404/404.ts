import mountTemplate from "../../utils/mountTemplate"
import { notFoundTemplate } from "./404Tpl"

export default function mount(rootId: string) {
    mountTemplate(rootId, notFoundTemplate)
}
