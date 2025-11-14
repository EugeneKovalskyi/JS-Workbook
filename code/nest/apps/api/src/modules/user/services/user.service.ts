
import { ROLE } from '#common/constants'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '#common/services/prisma/prisma.service'
import { UserPasswordService } from './user-password.service'
import { CreateUserReqDto, CreateUserResDto, UpdateUserReqDto } from '../user.dto'

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userPasswordService: UserPasswordService
	) {}

	async createUser(dto: CreateUserReqDto): Promise<CreateUserResDto> {
		const { name, email, password } = dto
		const hashedPassword = await this.userPasswordService.hash(password)

		return await this.prismaService.user.create({
			data: {
				name,
				email,
				role: ROLE.USER,
				password: hashedPassword,
			},

			omit: { password: true },
		})
	}

	async getUser(id: number): Promise<CreateUserResDto> {
		return await this.prismaService.user.findFirstOrThrow({
			where: { id },
			omit: { password: true }
		})
	}

	async getAllUsers(take: number): Promise<CreateUserResDto[]> {
		return await this.prismaService.user.findMany({
			take,
			omit: { password: true },
		})
	}

	async updateUser(id: number, dto: UpdateUserReqDto) {
		const { passwords, ...data } = dto
		
		if (passwords)
			data['password'] = await this.userPasswordService.update(id, passwords)

		await this.prismaService.user.update({
			data,
			where: { id },
			omit: { password: true },
		})
	}

	async deleteUser(id: number) {
		await this.prismaService.user.delete({
			where: { id },
		})
	}
}
