// import { validateRegister, } from '../validation/register';

import { URLS, } from '../constants/url';
import Router from '../routing/router';

function defaultFetch() {
    fetch(`${URLS.basuUrl}/auth/signup`, {
        'method': 'POST',
        'credentials': 'include',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json',
        },
        'body': JSON.stringify({
            'first_name': 'Артурт 1',
            'second_name': 'Морган 1',
            'login': 'practicum',
            'email': 'a.morgan@rdr22.com',
            'phone': '+71234567890',
            'password': 'p@ssw0rdOa1',
        }),
    })
        .then(response => {
            return response.text()
        })
        .then(data => {
            return data;
        })
        .then(() => {
            fetch(`${URLS.basuUrl}/auth/user`, {
                'method': 'GET',
                'mode': 'cors',
                'credentials': 'include',
            })
                .then(r => r.json())
                .then(data => {
                    console.log('user', data);
                });
        });
}

export class RegisterController {
    private _router

    constructor() {
        this.formSubmit = this.formSubmit.bind(this)
        this._router = new Router();
    }

    private registerUser() {
        debugger
        defaultFetch()
    }

    formSubmit(event: Event) {
        event.preventDefault()

        // if (!validateRegister) {
        //     return
        // }

        const form = (document.querySelector('#register-form')) as HTMLFormElement
        const data = new FormData(form)

        for (const pair of Array.from(data)) {
            // eslint-disable-next-line no-console
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        this.registerUser()

        //  this._router.go('/chat');
    }
}
