export const ROLE_KEY = 'ROLE'
export const ROLE = {
	ADMIN: 1,
	USER: 2,
	ANONYM: 3
} as const

export const ERROR = {
	MESSAGE: {
		AUTHORIZATION_HEADER_ABSENT: 'Absent HTTP-header "Authorization"',
		ACCESS_TOKEN_INVALID: 'Invalid access-token',
		DEVICE_ABSENT: 'Device doesn`t exist',
		REFRESH_TOKEN_INVALID: 'Invalid refresh-token',
		REFRESH_TOKEN_ABSENT: 'HTTP-header "Cookie" doesn`t contain refresh-token',
		PASSWORD_WRONG: 'Wrong password',
		PASSWORD_ABSENT: 'Password doesn`t exist. User was created with sign-in service',
		TOKEN_ORIGIN_ABSENT: 'HTTP-header "Cookie" doesn`t contain token origin',
		TOKEN_ORIGIN_INVALID: 'Invalid token origin',
		USER_ABSENT: 'User does not exist',
		UNCAUGHT_EXCEPTION: 'Uncaught exception'
	}
} as const


export const SAFE_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: true,
	sameSite: 'strict'
} as const

export const TOKEN_ORIGIN = {
	PASSWORD: 'password',
	GOOGLE: 'google'
} as const