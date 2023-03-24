import Block from "../block/block";
import { InputProps } from "../../types/input";

import { inputTemplate } from "./inputTpl";
import { VALIDATION_MESSAGES } from "../../constants/validationMessages";
import { InputNames } from "../../constants/inputNames";

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        const validationError = this.props.validationError
            ? this.props.validationError
            : VALIDATION_MESSAGES[this.props.name as InputNames]

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
            readOnly: this.props.readOnly,
            validationError: validationError
        });
    }
}
