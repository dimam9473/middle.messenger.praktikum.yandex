import { METHODS, } from '../constants/methods'
import { Options, } from '../types/fetch'
import httpTransport from './HTTPTransport'

export const fetch = (url: string, options?: Options): Promise<unknown> => {
    const innerOptions = options || {}
    const method = innerOptions.method ? innerOptions.method : METHODS.GET

    switch (method) {
        case METHODS.GET: return httpTransport.get(url, innerOptions)
        case METHODS.POST: return httpTransport.post(url, innerOptions)
        case METHODS.PUT: return httpTransport.put(url, innerOptions)
        case METHODS.DELETE: return httpTransport.delete(url, innerOptions)
        default: return httpTransport.get(url, innerOptions)
    }
}

export function fetchWithRetry(url: string, options?: Options): Promise<unknown> {
    const tries = options && options.tries ? options.tries : 1

    function onError(err: Error) {
        const triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }

        return fetchWithRetry(url, { ...options, 'tries': triesLeft, });
    }

    return fetch(url, options).catch(onError);
}
