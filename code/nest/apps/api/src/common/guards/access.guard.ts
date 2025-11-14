import type { Request } from 'express'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { getAccessTokenFromHeader } from '../utils'
import { TokensService } from '../services/tokens/tokens.service'
import { ERROR } from '../constants'

@Injectable()
export class JwtAccessGuard implements CanActivate {
	constructor(private readonly tokensService: TokensService) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const req = ctx.switchToHttp().getRequest<Request>()
		const token = getAccessTokenFromHeader(req)

		if (!token)
			throw new UnauthorizedException(ERROR.MESSAGE.AUTHORIZATION_HEADER_ABSENT)

		try {
			const payload = await this.tokensService.verifyAccess(token)
			
			req['payload'] = payload

			return true

		} catch (error) {
			throw new UnauthorizedException(error)
		}
	}
}
