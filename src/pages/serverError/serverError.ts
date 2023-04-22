import Block from '../../components/block/block';

import { serverErrorTemplate, } from './serverErrorTpl'

export class ServerError extends Block {
    constructor(props?: object) {
        super(props);
    }

    render() {
        const template = this.compile(serverErrorTemplate, this.props)
        return template;
    }
}
