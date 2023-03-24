export type TextProps = {
    text: string,
    events?: { [key: string]: Function }
} & Partial<HTMLSpanElement>
