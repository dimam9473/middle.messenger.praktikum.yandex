import { METHODS, } from '../constants/methods'

export type MethodType = METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE

export type XHRData = Document | XMLHttpRequestBodyInit | null | undefined

export type Options = {
    timeout?: number
    method?: MethodType
    data?: XHRData
    headers?: { [key: string]: string }
    tries?: number
}
