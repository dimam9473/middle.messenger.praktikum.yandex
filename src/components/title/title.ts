import Block from "../block/block";
import { TitleProps } from "../../types/title";
import { titleTemplate } from "./titleTpl";

export class Title extends Block {
    constructor(props: TitleProps) {
        super(props);
    }

    render() {
        return this.compile(titleTemplate, {
            caption: this.props.caption,
            className: this.props.className
        });
    }
}
