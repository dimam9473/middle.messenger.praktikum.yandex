import { InputNames, } from '../constants/inputNames'
import { validateMessage, } from '../utils/inputHelper'

export function sendMessage() {
    const isMessageValid = validateMessage()

    if (!isMessageValid) {
        return
    }

    const input = (document.querySelector(`#${InputNames.message}`) as HTMLInputElement)
    // eslint-disable-next-line no-console
    console.log(input.value)
}
