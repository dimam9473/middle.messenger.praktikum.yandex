export type InputProps = {
    inputWrapper?: string
    label?: string
    readonly?: boolean
    events?: { [key: string]: Function }
} & Partial<HTMLInputElement>
