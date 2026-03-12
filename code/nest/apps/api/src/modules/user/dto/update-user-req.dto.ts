import {
	ArrayNotEmpty,
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { RoleName } from '@prisma/client'
import { PasswordsDTO } from './passwords.dto'

export class UpdateUserReqDTO {
	@MaxLength(256)
	@MinLength(6)
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	name?: string

	@IsEnum(RoleName, { each: true })
	@ArrayNotEmpty()
	@IsArray()
	@IsOptional()
	roles?: RoleName[]

	@ValidateNested()
	@Type(() => PasswordsDTO)
	@IsOptional()
	passwords?: PasswordsDTO
}