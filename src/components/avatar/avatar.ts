import { AvatarProps, } from '../../types/avatar';
import { URLS, } from '../../constants/url';
import { avatarTemplate, } from './avatarTpl';
import Block from '../block/block';

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props);
    }

    render() {
        return this.compile(avatarTemplate, {
            'src': `${URLS.resource}${this.props.src}`,
            'className': this.props.className,
        });
    }
}
