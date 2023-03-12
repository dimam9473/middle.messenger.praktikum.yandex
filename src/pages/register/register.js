import mountTemplate from "../../utils/mountTemplate"
import { registerTemplate } from './registerTpl'

export default function mount(rootId) {
    mountTemplate(rootId, registerTemplate)
    const button = document.getElementById('create-account')

    button.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.pathname = 'chat'
    })
}
