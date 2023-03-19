import Block from "../block/block";
import { titleTemplate } from "./titleTpl";

export type TitleProps = {
    caption: string,
} & Partial<HTMLHeadingElement>

export class Title extends Block {
    constructor(props: TitleProps) {
        super(props);
    }

    render() {
        return this.compile(titleTemplate, {
            caption: this.props.caption,
            class: this.props.class
        });
    }
}
