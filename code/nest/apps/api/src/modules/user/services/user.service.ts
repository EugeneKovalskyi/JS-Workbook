import { Injectable } from '@nestjs/common'
import { CreateUserReqDTO, UpdateUserReqDTO, UserDTO } from '../dto'
import { RoleName, User} from '@prisma/client'
import { PrismaService } from '#common/services/prisma/prisma.service'
import { UserPasswordService } from './user-password.service'

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userPasswordService: UserPasswordService
	) {}
	async createUser(
		dto: CreateUserReqDTO
	): Promise<UserDTO> {
		const { name, email, password } = dto

		const hashedPassword = await this.userPasswordService.hash(password)

		const user = await this.prismaService.user.create({
			data: {
				name,
				email,
				password: hashedPassword,

				roles: {
					create: [
						{
							role: {
								connect: {
									name: RoleName.JUNIOR,
								},
							},
						},
					],
				},
			},

			include: {
				roles: {
					include: {
						role: {
							select: { name: true },
						},
					},

					omit: { userId: true, roleId: true },
				},
			},

			omit: { password: true },
		})

		const roles = user.roles.map(({ role }) => role.name)

		return { ...user, roles }
	}

	async getUser(id: number): Promise<UserDTO> {
		const user = await this.prismaService.user.findFirstOrThrow({
			where: { id },

			include: {
				roles: {
					include: {
						role: {
							select: { name: true },
						},
					},

					omit: { userId: true, roleId: true },
				},
			},

			omit: { password: true },
		})

		const roles = user.roles.map(({ role }) => role.name)

		return { ...user, roles }
	}

	async getAllUsers(take: number): Promise<UserDTO[]> {
		const users = await this.prismaService.user.findMany({
			include: {
				roles: {
					include: {
						role: {
							select: { name: true },
						},
					},

					omit: { userId: true, roleId: true },
				},
			},

			omit: { password: true },

			take,
		})

		return users.map((user) => ({
			...user,
			roles: user.roles.map(({ role }) => role.name),
		}))
	}

	async updateUser(id: number, dto: UpdateUserReqDTO) {
		const { passwords, ...restData } = dto
		const data: Partial<User> = { ...restData }

		if (passwords && !passwords.newPassword) {
			data.password = await this.userPasswordService.update(id, passwords)
		}

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
