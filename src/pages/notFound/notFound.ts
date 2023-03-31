import { Block, } from '../../components';
import { notFoundTemplate, } from './notFoundTpl';

export class NotFoundError extends Block {
    constructor(props?: object) {
        super(props);
    }

    render() {
        const template = this.compile(notFoundTemplate, this.props)
        return template;
    }
}
