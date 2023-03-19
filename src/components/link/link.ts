import Block from "../block/block";
import { linkTemplate } from "./linkTpl";

export type LinkProps = {
    caption: string,
} & Partial<HTMLAnchorElement>

export class Link extends Block {
    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return this.compile(linkTemplate, {
            caption: this.props.caption,
            href: this.props.href,
            className: this.props.className
        });
    }
}
