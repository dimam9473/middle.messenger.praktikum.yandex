import { ActionType, } from '../constants/action'

export type ModalProps = {
    visible: boolean
    actionType: ActionType
    // eslint-disable-next-line no-unused-vars
    callback?: (actionType: ActionType, userLogin: string) => void
}
