import { Input, } from '../input/Input';
import Block from '../block/block';

import { ActionType, } from '../../constants/action';
import { Button, } from '../button/button';
import { ModalProps, } from '../../types/modal';
import { modalTemplate, } from './modalTpl';

export class Modal extends Block {
    constructor(props: ModalProps) {
        super(props);
    }

    protected init(): void {
        this.children.userNameInput = new Input({
            'id': 'userName',
            'name': 'userName',
            'placeholder': 'User name',
        })

        this.children.actionButton = new Button({
            'caption': this.props.actionType,
            // 'className': 'send-button',
            'events': {
                'click': async () => {
                    const userLogin = (document.querySelector('#userName') as HTMLInputElement).value
                    await this.props.callback?.(this.props.actionType, userLogin)
                },
            },
        })

        this.children.closeButton = new Button({
            'caption': 'x',
            'className': 'button-text modal-close',
            'events': {
                'click': () => this.setProps({
                    'visible': false,
                    'actionType': ActionType.none,
                }),
            },
        })
    }

    protected componentDidUpdate(_oldProps: ModalProps, _newProps: ModalProps): boolean {
        if (_oldProps !== _newProps) {
            (this.children.actionButton as Block).setProps({
                'caption': _newProps.actionType,
            });

            return true
        }

        return false
    }

    render() {
        return this.compile(modalTemplate, this.props);
    }
}
