export interface AuthResponse {
	deviceId: number
	refreshToken: string,
	tokenInfo: TokenInfo
}

export interface TokenInfo {
	accessToken: string
	name: string
	email: string
	picture: string
}

export interface TokensData {
	access_token: string
	expires_in: number
	refresh_token: string
	scope: string
	token_type: string
	id_token: string
}

export type AccessTokenData = Omit<TokensData, 'refresh_token'>

export interface UserInfoFromIdToken {
	iss: string
	azp: string
	aud: string
	sub: string
	email: string
	email_verified: boolean
	at_hash: string
	name: string
	picture: string
	given_name: string
	family_name: string
	iat: number
	exp: number
}

export interface GoogleAccessTokenInfo {
  issued_to: string
  audience: string
  user_id: number
  scope: string
  expires_in: number
  email: string
  verified_email: boolean
  access_type: 'online' | 'offline'
}