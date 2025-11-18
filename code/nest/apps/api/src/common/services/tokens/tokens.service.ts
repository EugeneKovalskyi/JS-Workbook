import type { RefreshToken } from '@prisma/client'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Payload, TokenOrigin, Tokens } from './tokens.types'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TokensService {
	constructor(
		@Inject('JWT_ACCESS') private readonly accessJwt: JwtService,
		@Inject('JWT_REFRESH') private readonly refreshJwt: JwtService,
		private readonly prismaService: PrismaService
	) {}

	async generateTokens(payload: Payload): Promise<Tokens> {
		return {
			accessToken: await this.accessJwt.signAsync(payload),
			refreshToken: await this.refreshJwt.signAsync(payload),
		}
	}

	async verifyAccessToken(token: string): Promise<Payload> {
		const { id, role, name } = await this.accessJwt.verifyAsync<Payload>(token)
		return { id, role, name }
	}

	async verifyRefreshToken(token: string): Promise<Payload> {
		const { id, role, name } = await this.refreshJwt.verifyAsync<Payload>(token)
		return { id, role, name }
	}

	async createRefreshToken(value: string, origin: TokenOrigin, deviceId: number) {
		await this.prismaService.refreshToken.create({ data: { value, origin, deviceId } })
	}

	async getRefreshToken(deviceId: number): Promise<RefreshToken> {
		return await this.prismaService.refreshToken.findFirstOrThrow({
			where: { deviceId },
		})
	}

	async updateRefreshToken(value: string, id: number) {
		await this.prismaService.refreshToken.update({
			data: { value },
			where: { id },
		})
	}
}
