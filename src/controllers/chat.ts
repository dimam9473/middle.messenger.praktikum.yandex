import { ContactProps } from "../types/contact";
import { Messenger } from "../components/messenger/messenger";

export function handleClick(contact: ContactProps, messenger: Messenger) {
    messenger.setProps({
        firstName: contact.firstName
    })
}
