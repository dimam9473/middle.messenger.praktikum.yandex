import Block from "../../components/block/block";

import { notFoundTemplate } from "./404Tpl";

function initComponents() {
    return {}
}

export class NotFoundError extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(notFoundTemplate)
        return template;
    }
}
