import { InputNames } from "./inputNames";

export const VALIDATION_RULES: Partial<Record<InputNames, RegExp>> = {
    [InputNames.login]: /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/,
    [InputNames.password]: /^(?=.*[0-9])(?=.*[А-ЯA-Z])[а-яА-ЯёЁa-zA-Z0-9!@#$%^&*]{8,20}$/,
    [InputNames.oldPassword]: /^(?=.*[0-9])(?=.*[А-ЯA-Z])[а-яА-ЯёЁa-zA-Z0-9!@#$%^&*]{8,20}$/,
    [InputNames.email]: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    [InputNames.phone]: /^[\s()+-]*([0-9][\s()+-]*){10,15}$/,
    [InputNames.firstName]: /^[A-ZА-Я]{1,1}[а-яА-ЯёЁa-zA-Z-]{1,}$/,
    [InputNames.secondName]: /^[A-ZА-Я]{1,1}[а-яА-ЯёЁa-zA-Z-]{1,}$/,
    [InputNames.message]: /.*\S.*/,
    [InputNames.displayName]: /.*\S.*/,
}
