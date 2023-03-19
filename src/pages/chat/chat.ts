import Block from "../../components/block/block";
import { Link } from "../../components/link/link";

import { chatTemplate } from "./chatTpl";

function initComponents() {
    const profile = new Link({
        caption: 'Profile',
        href: 'profile'
    })

    return { profile }
}

export class Chat extends Block {
    constructor(props?: object) {
        const components = initComponents()

        super({ ...props, ...components });
    }

    render() {
        const template = this.compile(chatTemplate)
        return template;
    }
}
