import { AvatarProps, } from '../../types/avatar';
import { avatarTemplate, } from './avatarTpl';
import Block from '../block/block';

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props);
    }

    render() {
        return this.compile(avatarTemplate, {
            'src': `https://ya-praktikum.tech/api/v2/resources${this.props.src}`,
            'className': this.props.className,
        });
    }
}
