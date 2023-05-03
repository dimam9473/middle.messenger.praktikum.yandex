import { METHODS, } from '../constants/methods';
import { Options, OptionsWithouMethods, } from '../types/fetch';
import { queryStringify, } from '../utils/queries';

// eslint-disable-next-line no-unused-vars
type HTTPMethod = (url: string, options?: OptionsWithouMethods) => Promise<XMLHttpRequest>

export class HTTPTransport {
    get: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, 'method': METHODS.GET, });
    };

    post: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, 'method': METHODS.POST, });
    };

    put: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, 'method': METHODS.PUT, });
    };

    delete: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, 'method': METHODS.DELETE, });
    };

    request = (url: string, options: Options): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data, timeout = 5000, } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.withCredentials = true;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data as object)}`
                    : url
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

export default new HTTPTransport();
