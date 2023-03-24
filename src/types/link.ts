export type LinkProps = {
    caption: string,
    events?: { [key: string]: Function }
} & Partial<HTMLAnchorElement>
