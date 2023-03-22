import { METHODS } from "../constants/methods";
import { Options } from "../types/fetch";
import { queryStringify } from "../utils/queries";

export class HTTPTransport {
    private static _instance: HTTPTransport;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get = (url: string, options: Options) => {

        return this.request(url, { ...options, method: METHODS.GET });
    };

    post = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    put = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    delete = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: Options) => {
        const { headers = {}, method, data, timeout = 5000 } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data as object)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export const fetch = (url: string, options?: Options): Promise<unknown> => {
    const innerOptions = options || {}
    const method = innerOptions.method ? innerOptions.method : METHODS.GET
    const httpTransport = HTTPTransport.Instance

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

        return fetchWithRetry(url, { ...options, tries: triesLeft });
    }

    return fetch(url, options).catch(onError);
} 
