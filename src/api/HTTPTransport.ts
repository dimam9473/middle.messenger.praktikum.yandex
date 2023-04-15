import { METHODS, } from '../constants/methods';
import { Options, } from '../types/fetch';
import { queryStringify, } from '../utils/queries';

export class HTTPTransport {
    get = (url: string, options?: Options) => {

        return this.request(url, { ...options, 'method': METHODS.GET, });
    };

    post = (url: string, options: Options) => {
        return this.request(url, { ...options, 'method': METHODS.POST, });
    };

    put = (url: string, options: Options) => {
        return this.request(url, { ...options, 'method': METHODS.PUT, });
    };

    delete = (url: string, options: Options) => {
        return this.request(url, { ...options, 'method': METHODS.DELETE, });
    };

    request = (url: string, options: Options) => {
        const { headers = {}, method, data, timeout = 5000, } = options;

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
