import type { Request } from 'express'

export interface AccessRequest extends Request {
	payload: IPayload
}

export interface RefreshRequest extends Request {
	refreshId: number
	payload: IPayload
}

export interface IPayload {
	id: number
	role: string
	name: string
}

export interface IAuthResponse {
	deviceId?: number
	tokens: ITokens

}

export interface ITokens {
	access: string
	refresh: string
}
