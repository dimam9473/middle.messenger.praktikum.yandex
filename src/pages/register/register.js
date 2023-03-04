import Handlebars from "handlebars"
import template from "bundle-text:./register.hbs"

export default function mountRegister() {
    return Handlebars.compile(template)
}

{/* <script>
        const button = document.getElementById('create-account')

        button.addEventListener('click', function (e) {
            e.preventDefault()
            window.location.href = 'chat'
        })
    </script> */}