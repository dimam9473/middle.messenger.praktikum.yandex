import { ButtonProps, } from '../../types/button';
import Block from '../block/block';

import { buttonTpl, } from './buttonTpl';

export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(buttonTpl, {
            'caption': this.props.caption,
            'id': this.props.id,
            'type': this.props.type,
            'className': `${this.props.className || ''}`,
        });
    }
}
