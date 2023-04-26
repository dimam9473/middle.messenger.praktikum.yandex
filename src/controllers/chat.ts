import { ContactProps, } from '../types/contact';
import { Messenger, } from '../components/messenger/messenger';
import Router from '../routing/router';

export class ChatController {
    private _router

    constructor() {
        this._router = new Router();
    }

    handleClick(contact: ContactProps, messenger: Messenger) {
        messenger.setProps({
            'firstName': contact.firstName,
        })
    }

    redirect() {
        this._router.go('/profile');
    }
}
