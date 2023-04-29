import { MessengerProps, } from '../../types/messenger';
import { prepareDate, } from '../../utils/date';
import Block from '../block/block';

import { contactTemplate, } from './contactTpl';

export class Contact extends Block {
    constructor(props: MessengerProps) {
        super(props);
    }

    render() {
        const { time, ...restProps } = this.props as MessengerProps

        const prepairedDate = time ? prepareDate(time) : ''

        return this.compile(contactTemplate, { ...restProps, 'time': prepairedDate, });
    }
}
