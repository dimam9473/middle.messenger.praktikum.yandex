import { Button, } from '../button/button';
import { ChatProps, } from '../../types/chat';
import { prepareDate, } from '../../utils/date';
import Block from '../block/block';

import { contactTemplate, } from './contactTpl';

export class Contact extends Block {
    constructor(props: ChatProps) {
        super(props);
    }

    protected init(): void {
        this.children.delete = new Button({
            'caption': '-',
            'className': 'button-green button-small',
            'events': {
                'click': (event: Event) => {
                    event.stopPropagation()
                    this.props.deleteChat()
                },
            },
        });
    }

    render() {
        const { last_message, ...restProps } = this.props as ChatProps
        const prepairedDate = last_message?.time ? prepareDate(new Date(last_message.time)) : ''

        return this.compile(contactTemplate, { ...restProps, 'time': prepairedDate, });
    }
}
