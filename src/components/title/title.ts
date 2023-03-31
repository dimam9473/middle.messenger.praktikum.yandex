import { TitleProps, } from '../../types/title';
import { titleTemplate, } from './titleTpl';
import Block from '../block/block';

export class Title extends Block {
    constructor(props: TitleProps) {
        super(props);
    }

    render() {
        return this.compile(titleTemplate, {
            'caption': this.props.caption,
            'className': this.props.className,
        });
    }
}
