import mountTemplate from "../../utils/mountTemplate"
import { loginTemplate } from "./loginTpl"

export default function mount(rootId: string) {
    mountTemplate(rootId, loginTemplate)

    const button = document.getElementById('enter')

    button?.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.pathname = 'chat'
    })
}
