export const ROLE_KEY = 'ROLE'
export const ROLE = {
	ADMIN: 3,
	MANAGER: 2,
	USER: 1
} as const

export const ERROR = {
	TYPE: {
		AUTHORIZATION: 'AuthorizationError'
	},

	MESSAGE: {
		AUTHORIZATION_HEADER_ABSENT: 'HTTP-header `Authorization` is absent.',
		DEVICE_ABSENT: 'Device isn`t exist.',
		REFRESH_TOKEN_INVALID: 'Refresh-token isn`t equal to token from DB.',
		REFRESH_TOKEN_ABSENT: 'HTTP-header "Cookie" doesn`t contain refresh-token',
		PASSWORD_INVALID: 'Wrong password.',
		UNCAUGHT_EXCEPTION: 'Uncaught exception!',
	}
} as const


export const SAFE_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: true,
	sameSite: 'strict'
} as const
