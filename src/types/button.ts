export type ButtonProps = {
    caption: string,
    events?: { [key: string]: Function }
} & Partial<HTMLButtonElement>
