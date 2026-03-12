import {
	ArrayNotEmpty,
	IsArray,
	IsEmail,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator'
import { Type } from 'class-transformer'
import { RoleName } from '@prisma/client'

export class UserDTO {
	@IsInt()
	@IsPositive()
	@Type(() => Number)
	id: number

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
	@IsString()
	@IsOptional()
	password?: string | null

	@IsEnum(RoleName, { each: true })
	@ArrayNotEmpty()
	@IsArray()
	roles: RoleName[]
}