export function queryStringify(data: object) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key as keyof typeof data]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}
