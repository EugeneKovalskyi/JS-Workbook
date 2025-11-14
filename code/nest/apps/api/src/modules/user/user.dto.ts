import { User } from '@prisma/client'

export interface CreateUserByGoogleReqDto {
	name: string
	email: string
}

export interface CreateUserReqDto {
	name: string
	email: string 
	password: string
}

export interface UpdateUserReqDto {
	name?: string
	role?: number
	passwords?: Passwords
}

export interface Passwords {
	oldPassword: string
	newPassword: string
}

export type CreateUserResDto = Omit<User, 'password'>
