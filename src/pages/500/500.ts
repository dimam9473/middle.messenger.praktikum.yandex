import Block from "../../components/block/block";

import { serverErrorTemplate } from "./500Tpl"

function initComponents() {
    return {}
}

export class ServerError extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(serverErrorTemplate)
        return template;
    }
}
