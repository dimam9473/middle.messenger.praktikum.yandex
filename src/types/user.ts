export type UserProps = {
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
}

// {
//     "first_name": "string",
//     "second_name": "string",
//     "display_name": "string",
//     "login": "string",
//     "email": "string",
//     "phone": "string"
//   }

export type AuthUserProps = { id: string, avatar: string, display_name: string } & UserProps

export type UserUpdateProps = Omit<AuthUserProps, 'id' | 'password' | 'avatar'>
