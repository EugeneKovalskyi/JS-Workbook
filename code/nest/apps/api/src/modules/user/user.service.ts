import type { UserResponse } from './user.types'
import type { UpdateUserDTO, CreateUserDTO } from './user.dto'
import { ERROR, ROLE } from '#common/constants'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '#common/services/prisma/prisma.service'
import { genSalt, hash, compare } from 'bcrypt'

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async createUser(dto: CreateUserDTO): Promise<UserResponse> {
		const { name, password } = dto
		const salt = await genSalt(10)
		const hashedPassword = await hash(password, salt)

		return await this.prismaService.user.create({
			data: {
				name,
				role: ROLE.USER,
				password: hashedPassword,
			},

			omit: { password: true },
		})
	}

	async getUser(id: number): Promise<UserResponse> {
		return await this.prismaService.user.findFirstOrThrow({
			where: { id },
			omit: { password: true },
		})
	}	

	async getAllUsers(): Promise<UserResponse[]> {
		return await this.prismaService.user.findMany({
			take: 5,
			omit: { password: true }
		})
	}

	async updateUser(id: number, dto: UpdateUserDTO): Promise<UserResponse> {
		const {
			passwords,
			...data
		} = dto

		if (passwords) {
			const { oldPassword, newPassword } = passwords
			const { password } = await this.prismaService.user.findFirstOrThrow({
				where: { id },
				select: { password: true },
			})

			const isPasswordCorrect = await compare(oldPassword, password)
			if (!isPasswordCorrect) 
				throw new UnauthorizedException(ERROR.MESSAGE.PASSWORD_INVALID)

			const salt = await genSalt(10)

			data['password'] = await hash(newPassword, salt)
		}

		return await this.prismaService.user.update({
			data,
			where: { id },
			omit: { password: true },
		})
	}

	async deleteUser(id: number) {
		await this.prismaService.user.delete({
			where: { id }
		})
	}
}
