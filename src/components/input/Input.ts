import { InputProps, } from '../../types/input';
import Block from '../block/block';

import { InputNames, } from '../../constants/inputNames';
import { VALIDATION_MESSAGES, } from '../../constants/validationMessages';
import { inputTemplate, } from './inputTpl';

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        const validationError = this.props.validationError
            ? this.props.validationError
            : VALIDATION_MESSAGES[this.props.name as InputNames]

        return this.compile(inputTemplate, {
            ...this.props,
            'validationError': validationError,
        });
    }
}
