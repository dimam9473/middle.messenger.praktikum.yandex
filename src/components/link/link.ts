import { LinkProps, } from '../../types/link';
import { linkTemplate, } from './linkTpl';
import Block from '../block/block';

export class Link extends Block {
    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return this.compile(linkTemplate, {
            'caption': this.props.caption,
            'href': this.props.href,
            'className': this.props.className,
        });
    }
}
