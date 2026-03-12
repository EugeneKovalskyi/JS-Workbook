import type { Request } from 'express'
import type { Payload, Tokens } from '#common/services/tokens/tokens.types'

export interface RegisterDTO {
	name: string
	email: string
	password: string
}

export interface SignInDTO {
	email: string
	password: string
}

export interface RegisterResDTO {
	deviceId?: number
	tokens: Tokens
}

export interface SignInResDTO extends RegisterResDTO {}

export interface AccessTokenRequestDTO extends Request {
	payload: Payload
}

export interface RefreshTokenRequestDTO extends Request {
	refreshTokenId: number
	payload: Payload
}
