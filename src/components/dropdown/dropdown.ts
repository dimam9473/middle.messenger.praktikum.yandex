import { Button, } from '../button/button';
import { dropDownTemplate, } from './dropdownTpl';
import Block from '../block/block';

import { DropdownProps, } from '../../types/dropdown';

export class Dropdown extends Block {
    constructor(props: DropdownProps) {
        super(props);
    }

    protected init(): void {
        this.children.options = []

        for (const option of (this.props as DropdownProps).options) {
            this.children.options.push(new Button({
                'caption': option.title,
                'className': 'button-text dropdown-button',
                'events': {
                    'click': () => {
                        option.callback?.()
                        this.setProps({
                            'visible': false,
                        })
                    },
                },
            }))
        }
    }

    getVisible() {
        return this.props.visible
    }

    render() {
        return this.compile(dropDownTemplate, this.props);
    }
}
