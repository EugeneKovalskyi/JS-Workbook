import { RoleName } from '@prisma/client'

export interface Payload {
	id: number
	roles: RoleName[]
	name: string
}

export interface Tokens {
	accessToken: string
	refreshToken: string
}
