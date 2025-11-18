import type { Request } from 'express'
import { ERROR } from '#common/constants'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { TokensService } from '#common/services/tokens/tokens.service'

@Injectable()
export class RefreshGuard implements CanActivate {
	constructor(private readonly tokensService: TokensService) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const req = ctx.switchToHttp().getRequest<Request>()
		const token = String(req.cookies.refreshToken)
		const deviceId = Number(req.cookies.deviceId)

		if (!token)
			throw new UnauthorizedException(ERROR.MESSAGE.REFRESH_TOKEN_ABSENT)

		try {
			const payload = await this.tokensService.verifyRefreshToken(token) 
			const refreshToken = await this.tokensService.getRefreshToken(deviceId)

			if (refreshToken.value !== token)
				throw new UnauthorizedException(ERROR.MESSAGE.REFRESH_TOKEN_INVALID)

			req['payload'] = payload
			req['refreshTokenId'] = refreshToken.id

			return true

		} catch (error) {
			throw new UnauthorizedException(error)
		}
	}
}
