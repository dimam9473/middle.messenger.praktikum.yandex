import Block from "../block/block";
import { buttonTpl } from "./buttonTpl";

export type ButtonProps = { caption: string } & Partial<HTMLButtonElement>

export class Button extends Block {
    constructor(props: ButtonProps) {
        // Создаём враппер дом-элемент button
        super(props, "button");
    }

    render() {
        // В проекте должен быть ваш собственный шаблонизатор
        // return `<div>${this.props.text}</div>`;
        return this.compile(buttonTpl, {
            caption: this.props.caption,
        });
    }
}
