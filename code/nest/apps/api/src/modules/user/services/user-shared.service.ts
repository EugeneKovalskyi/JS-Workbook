import type { Device } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CreateUserByGoogleReqDTO, UserDTO } from '../dto'
import { RoleName } from '@prisma/client'
import { PrismaService } from '#common/services/prisma/prisma.service'

@Injectable()
export class UserSharedService {
	constructor(private readonly prismaService: PrismaService) {}

	async createUserByGoogle(
		dto: CreateUserByGoogleReqDTO
	): Promise<UserDTO> {
		const { name, email } = dto

		const user = await this.prismaService.user.create({
			data: {
				name,
				email,
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

	async getUserByEmail(email: string): Promise<UserDTO | null> {
		const user = await this.prismaService.user.findFirst({
			where: { email },

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
		})

		if (!user) return null

		const roles = user.roles.map(({ role }) => role.name)

		return { ...user, roles }
	}

	async createDevice(name: string, userId: number): Promise<number> {
		const { id } = await this.prismaService.device.create({
			data: { name, userId },
		})

		return id
	}

	async getDevice(id: number): Promise<Device | null> {
		return await this.prismaService.device.findFirst({
			where: { id },
		})
	}

	async deleteDevice(id: number) {
		await this.prismaService.device.delete({
			where: { id },
		})
	}
}
