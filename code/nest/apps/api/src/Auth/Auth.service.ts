import type { IAuthResponse, IPayload, ITokens } from './types'
import type { AuthDTO } from './dto'
import { ERROR } from '../common/constants'
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../User/User.service'
import { TokensService } from '../common/services/Tokens/Tokens.service'
import { UserShared } from '../User/shared/User.shared'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private readonly tokensService: TokensService,
		private readonly userService: UserService,
		private readonly userShared: UserShared
	) {}

	async register(userAgent: string, dto: AuthDTO): Promise<IAuthResponse> {
		const user = await this.userService.createUser(dto)
		const tokens = await this.tokensService.generateTokens(user)
		const deviceId = await this.userShared.createDevice(userAgent, user.id)

		await this.tokensService.createRefresh(tokens.refresh, deviceId)

		return {
			deviceId,
			tokens
		}
	}

	async signIn(
		userAgent: string,
		clientDeviceId: number,
		dto: AuthDTO
	): Promise<IAuthResponse> {
		const { password, ...user } = await this.userShared.getUserByName(dto.name)
		const isPasswordCorrect = await compare(dto.password, password)
		
		if (!isPasswordCorrect) 
			throw new UnauthorizedException(ERROR.MESSAGE.PASSWORD_INVALID)

		const tokens = await this.tokensService.generateTokens(user)

		const device = await this.userShared.getDevice(clientDeviceId)
		if (device) {
			if (user.id !== device.userId)
				throw new ForbiddenException(ERROR.MESSAGE.DEVICE_ABSENT)
			
			const refreshToken = await this.tokensService.getRefresh(clientDeviceId)
			await this.tokensService.updateRefresh(tokens.refresh, refreshToken.id)
			
			return { tokens }
		}

		const deviceId = await this.userShared.createDevice(userAgent, user.id)
		await this.tokensService.createRefresh(tokens.refresh, deviceId)

		return { deviceId, tokens }
	}

	async signOut(clientDeviceId: number) {
		await this.userShared.deleteDevice(clientDeviceId)
	}

	async refresh(refreshId: number, payload: IPayload): Promise<ITokens> {
		const tokens = await this.tokensService.generateTokens(payload)
		await this.tokensService.updateRefresh(tokens.refresh, refreshId)

		return tokens
	}
}
