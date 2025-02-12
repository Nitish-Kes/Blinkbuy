import { LOGIN_TYPES } from "./Login"

export type Table = 'Users'

export type User = {
    id?: number,
    firstName?: string | null,
    lastName?: string | null,
    email?: string,
    phone?: string,
    password?: string,
    provider?: LOGIN_TYPES
    providerId?: string | null,
    createdAt?: Date
}

export type UserSocialLogin = {
    firstName: string | null,
    lastName: string | null,
    email: string
}