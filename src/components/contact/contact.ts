import { ContactProps, } from '../../types/contact';
import { prepareDate, } from '../../utils/date';
import Block from '../block/block';

import { contactTemplate, } from './contactTpl';

export class Contact extends Block {
    constructor(props: ContactProps) {
        super(props);
    }

    render() {
        const { time, ...restProps } = this.props as ContactProps

        const prepairedDate = time ? prepareDate(time) : ''

        return this.compile(contactTemplate, { ...restProps, 'time': prepairedDate, });
    }
}
