import type { Device, User } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import type { CreateUserByGoogleReqDto } from '../user.dto'
import { ROLE } from '#common/constants'
import { PrismaService } from '#common/services/prisma/prisma.service'

@Injectable()
export class UserSharedService {
	constructor(private readonly prismaService: PrismaService) {}

	async createUserByGoogle(dto: CreateUserByGoogleReqDto): Promise<User> {
		const { name, email } = dto
		
		return await this.prismaService.user.create({
			data: {
				name,
				email,
				role: ROLE.USER
			}
		})
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return await this.prismaService.user.findFirst({
			where: { email }
		})
	}

	async createDevice(name: string, userId: number): Promise<number> {
		const { id } = await this.prismaService.device.create({
			data: { name, userId }
		})

		return id
	}

	async getDevice(id: number): Promise<Device | null> {
		return await this.prismaService.device.findFirst({
			where: { id }
		})
	}

	async deleteDevice(id: number) {
		await this.prismaService.device.delete({
			where: { id }
		})
	}
}
