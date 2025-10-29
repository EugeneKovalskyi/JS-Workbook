export interface CreateUserDTO {
	name: string
	password: string
}

export interface UpdateUserDTO {
	role?: number
	name?: string
	passwords: Passwords
}

interface Passwords {
	oldPassword: string
	newPassword: string
}