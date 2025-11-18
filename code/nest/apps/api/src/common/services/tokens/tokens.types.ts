export interface Payload {
	id: number
	role: number
	name: string
}

export interface Tokens {
	accessToken: string
	refreshToken: string
}

export type TokenOrigin = 'password' | 'google'
