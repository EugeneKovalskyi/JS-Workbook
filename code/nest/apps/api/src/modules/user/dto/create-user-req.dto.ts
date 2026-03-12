import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class CreateUserReqDTO {
	@MaxLength(256)
	@MinLength(6)
	@IsNotEmpty()
	@IsString()
	name: string

	@MaxLength(256)
	@IsEmail()
	@IsNotEmpty()
	email: string

	@MinLength(8)
	@IsNotEmpty()
	@IsString()
	password: string
}
