import { TextProps, } from '../../types/text';
import Block from '../block/block';

import { textTemplate, } from './textTpl';

export class Text extends Block {
    constructor(props: TextProps) {
        super(props);
    }

    render() {
        return this.compile(textTemplate, this.props);
    }
}
