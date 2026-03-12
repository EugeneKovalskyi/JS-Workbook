import { IsString, MinLength } from 'class-validator'

export class PasswordsDTO {
	@MinLength(8)
	@IsString()
	oldPassword: string
	
	@MinLength(8)
	@IsString()
	newPassword: string
}