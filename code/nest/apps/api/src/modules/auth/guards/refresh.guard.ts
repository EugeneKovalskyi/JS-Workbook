import type { Request } from 'express'
import { ERROR } from '#common/constants'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common'
import { TokensService } from '#common/services/tokens/tokens.service'

@Injectable()
export class RefreshGuard implements CanActivate {
	constructor(
		private readonly tokensService: TokensService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>()
		const token = String(req.cookies.refresh)
		const deviceId = Number(req.cookies.deviceId)

		if (token)
			try {
				const payload = await this.tokensService.verifyRefresh(token)

				const refreshToken = await this.tokensService.getRefresh(deviceId)
				if (refreshToken.value !== token)
					throw new UnauthorizedException(ERROR.MESSAGE.REFRESH_TOKEN_INVALID)

				req['payload'] = payload
				req['refreshId'] = refreshToken.id

				return true

			} catch (error) {
				if (error.name !== 'Error') 
					throw new UnauthorizedException(error)

				throw new InternalServerErrorException()
			}
			
		else
			throw new UnauthorizedException({
				name: ERROR.TYPE.AUTHORIZATION,
				message: ERROR.MESSAGE.REFRESH_TOKEN_ABSENT,
			})
	}
}
