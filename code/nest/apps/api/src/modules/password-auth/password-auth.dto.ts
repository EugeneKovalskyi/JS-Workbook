import type { Request } from 'express'
import type { Payload, Tokens } from '#common/services/tokens/tokens.types'

export interface PasswordAuthDTO {
	name: string
	email: string
	password: string
}

export interface AccessTokenRequestDTO extends Request {
	payload: Payload
}

export interface RefreshTokenRequestDTO extends Request {
	refreshTokenId: number
	payload: Payload
}

export interface PasswordAuthResponseDTO {
	deviceId?: number
	tokens: Tokens
}
