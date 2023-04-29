export type Option = {
    title: string
    callback?: () => void
}

export type DropdownProps = {
    visible: boolean
    options: Option[]
} & Partial<HTMLElement>
