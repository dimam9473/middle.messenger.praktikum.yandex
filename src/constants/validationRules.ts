export const VALIDATION_RULES = {
    login: /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/,
    password: /^(?=.*[0-9])(?=.*[А-ЯA-Z])[а-яА-ЯёЁa-zA-Z0-9!@#$%^&*]{8,20}$/,
    email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    phone: /^[\s()+-]*([0-9][\s()+-]*){10,15}$/,
    name: /^[A-ZА-Я]{1,1}[а-яА-ЯёЁa-zA-Z-]{1,}$/
}
