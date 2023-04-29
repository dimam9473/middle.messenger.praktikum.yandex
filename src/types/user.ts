export type UserProps = {
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
}

export type AuthUserProps = { id: string, avatar: string, display_name: string } & UserProps

export type UserUpdateProps = Omit<AuthUserProps, 'id' | 'password' | 'avatar'>

export type Passwords = {
    oldPassword: string
    newPassword: string
}

export type ChatUserProps = Omit<AuthUserProps, 'id' | 'password' | 'display_name'>
