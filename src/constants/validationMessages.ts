import { InputNames, } from './inputNames';

export const VALIDATION_MESSAGES: Partial<Record<InputNames, string>> = {
    [InputNames.login]: 'Латиница или кириллица',
    [InputNames.password]: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    [InputNames.email]: 'Можно использлвать только латиницу',
    [InputNames.phone]: 'От 10 до 15 символов',
    [InputNames.firstName]: 'Латиница или кириллица',
    [InputNames.secondName]: 'Латиница или кириллицай',
    [InputNames.newPassword]: 'Пароли не совпадают',
    [InputNames.displayName]: 'Не должно быть пустым',
    [InputNames.oldPassword]: 'Не должен быть пустым',
}
