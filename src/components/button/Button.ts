import Block from "../block/block";
import { buttonTpl } from "./buttonTpl";

export type ButtonProps = {
    caption: string,
    id?: string,
    class?: string,
    type?: 'button' | 'submit'
    events?: { [key: string]: Function }
} & Partial<HTMLButtonElement>

export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(buttonTpl, {
            caption: this.props.caption,
            id: this.props.id || null,
            type: this.props.type,
            class: `button--green ${this.props.class || ''}`
        });
    }
}
