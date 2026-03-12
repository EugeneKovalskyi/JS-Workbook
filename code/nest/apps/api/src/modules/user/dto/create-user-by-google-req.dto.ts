import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserByGoogleReqDTO {
	@MaxLength(256)
	@MinLength(6)
	@IsNotEmpty()
	@IsString()
	name: string

	@MaxLength(256)
	@IsEmail()
	@IsNotEmpty()
	email: string
}