import Block from "../block/block";
import { inputTemplate } from "./inputTpl";

export type InputProps = {
    inputWrapper?: string
    label?: string
    name?: string
    placeholder?: string
    events?: { [key: string]: Function }
} & Partial<HTMLInputElement>

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(inputTemplate, {
            id: this.props.id,
            type: this.props.type,
            name: this.props.name,
            label: this.props.label,
            placeholder: this.props.placeholder,
            inputWrapper: this.props.inputWrapper,
        });
    }
}
