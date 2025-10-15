import type { Device, User } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../common/services/Prisma/Prisma.service'

@Injectable()
export class UserShared {
	constructor(private readonly prismaService: PrismaService) {}

	async getUserByName(name: string): Promise<User> {
		return await this.prismaService.user.findFirstOrThrow({
			where: { name }
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
