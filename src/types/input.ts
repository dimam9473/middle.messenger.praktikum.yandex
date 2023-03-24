export type InputProps = {
    inputWrapper?: string
    label?: string
    events?: { [key: string]: Function }
} & Partial<HTMLInputElement>
