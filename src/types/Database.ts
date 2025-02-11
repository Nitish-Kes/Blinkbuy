export type Table = 'Users'

export type User = {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    password?: string,
    provider?: 'EMAIL' | 'GOOGLE' | 'MICROSOFT' | 'APPLE'
    providerId?: string | null,
    createdAt?: Date
}