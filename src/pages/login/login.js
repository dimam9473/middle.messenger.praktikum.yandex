import mountTemplate from "../../utils/mountTemplate"
import template from "bundle-text:./login.hbs"

export default function mount(rootId) {
    mountTemplate(rootId, template)

    const button = document.getElementById('enter')

    button.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.pathname = 'chat'
    })
}