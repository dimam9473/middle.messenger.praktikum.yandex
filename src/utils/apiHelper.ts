import { OptionsWithouMethods, } from '../types/fetch';

export function prepareJsonProps(user: Record<string, unknown>): OptionsWithouMethods {
    return {
        'data': JSON.stringify(user),
        'headers': {
            'content-type': 'application/json',
        },
    }
}

export function prepareFileProps(data: FormData): OptionsWithouMethods {
    return {
        'data': data,
        'headers': {
            'content-type': 'multipart/form-data',
        },
    }
}
