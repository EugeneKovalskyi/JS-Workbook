import type { Request } from 'express'
import type { IPayload, ITokens } from '#common/types/token.types'

export interface AccessRequest extends Request {
	payload: IPayload
}

export interface RefreshRequest extends Request {
	refreshId: number
	payload: IPayload
}

export interface IAuthResponse {
	deviceId?: number
	tokens: ITokens
}
