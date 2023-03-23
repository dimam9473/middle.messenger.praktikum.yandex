import Block from "../block/block";
import { InputProps } from "../../types/input";

import { inputTemplate } from "./inputTpl";

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        if (this.element) {
            this.element.tabIndex = 0
        }


        return this.compile(inputTemplate, {
            id: this.props.id,
            type: this.props.type,
            name: this.props.name,
            label: this.props.label,
            placeholder: this.props.placeholder,
            inputWrapper: this.props.inputWrapper,
            required: this.props.required,
            pattern: this.props.pattern,
            className: this.props.className,
            readonly: this.props.readonly,
            validationError: this.props.validationError
        });
    }
}
