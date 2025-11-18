import type { Request } from 'express'
import type { Payload, Tokens } from '#common/services/tokens/tokens.types'

export interface AuthJwtDTO {
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

export interface AuthResponseDTO {
	deviceId?: number
	tokens: Tokens
}
