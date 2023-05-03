import { UserMessageProps, } from '../../types/messenger';
import Block from '../block/block';

import { messageTemplate, } from './messageTpl';

export class Message extends Block {
    constructor(props: UserMessageProps) {
        super(props);
    }

    render() {
        return this.compile(messageTemplate, this.props);
    }
}
