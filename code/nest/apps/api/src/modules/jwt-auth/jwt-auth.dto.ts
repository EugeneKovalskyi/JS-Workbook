import type { Request } from 'express'
import type { Payload, Tokens } from '#common/services/tokens/tokens.types'

export interface AuthJwtDTO {
	name: string
	email: string
	password: string
}

export interface AccessRequestDTO extends Request {
	payload: Payload
}

export interface RefreshRequestDTO extends Request {
	refreshId: number
	payload: Payload
}

export interface AuthResponseDTO {
	deviceId?: number
	tokens: Tokens
}
