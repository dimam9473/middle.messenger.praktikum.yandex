export const getTypeKey = <T>(strKey: string): keyof T => {
    return strKey as keyof T
}
