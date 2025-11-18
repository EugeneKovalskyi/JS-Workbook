import {
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { compare } from 'bcrypt'
import type { Payload, Tokens } from '#common/services/tokens/tokens.types'
import type { AuthJwtDTO, AuthResponseDTO } from './jwt-auth.dto'
import { ERROR, TOKEN_ORIGIN } from '#common/constants'
import { TokensService } from '#common/services/tokens/tokens.service'
import { UserService } from '../user/services/user.service'
import { UserSharedService } from '../user/services/user-shared.service'

@Injectable()
export class JwtAuthService {
	constructor(
		private readonly tokensService: TokensService,
		private readonly userService: UserService,
		private readonly userSharedService: UserSharedService
	) {}

	async register(userAgent: string, dto: AuthJwtDTO): Promise<AuthResponseDTO> {
		const user = await this.userService.createUser(dto)
		const tokens = await this.tokensService.generateTokens(user)
		const deviceId = await this.userSharedService.createDevice(userAgent, user.id)

		await this.tokensService.createRefreshToken(
			tokens.refreshToken,
			TOKEN_ORIGIN.PASSWORD,
			deviceId
		)

		return { deviceId, tokens }
	}

	async signIn(
		userAgent: string,
		clientDeviceId: number,
		dto: AuthJwtDTO
	): Promise<AuthResponseDTO> {
		const user = await this.userSharedService.getUserByEmail(dto.email)

		if (!user)
			throw new UnauthorizedException(ERROR.MESSAGE.USER_ABSENT)

		const { password, ...payload } = user

		if (!password)
			throw new UnauthorizedException(ERROR.MESSAGE.PASSWORD_ABSENT)

		const isPasswordCorrect = await compare(dto.password, password)

		if (!isPasswordCorrect)
			throw new UnauthorizedException(ERROR.MESSAGE.PASSWORD_WRONG)

		const tokens = await this.tokensService.generateTokens(payload)
		const device = await this.userSharedService.getDevice(clientDeviceId)

		if (device) {
			if (user.id !== device.userId)
				throw new ForbiddenException(ERROR.MESSAGE.DEVICE_ABSENT)

			const refreshToken = await this.tokensService.getRefreshToken(clientDeviceId)
			await this.tokensService.updateRefreshToken(tokens.refreshToken, refreshToken.id)

			return { tokens }
		}

		const deviceId = await this.userSharedService.createDevice(userAgent, user.id)
		await this.tokensService.createRefreshToken(
			tokens.refreshToken,
			TOKEN_ORIGIN.PASSWORD,
			deviceId
		)

		return { deviceId, tokens }
	}

	async signOut(deviceId: number) {
		await this.userSharedService.deleteDevice(deviceId)
	}

	async refresh(refreshTokenId: number, payload: Payload): Promise<Tokens> {
		const tokens = await this.tokensService.generateTokens(payload)
		await this.tokensService.updateRefreshToken(tokens.refreshToken, refreshTokenId)

		return tokens
	}
}
