import type { Request } from 'express'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common'
import { getAccessTokenFromHeader } from '../utils'
import { TokensService } from '../services/Tokens/Tokens.service'
import { ERROR } from '../constants'

@Injectable()
export class AccessGuard implements CanActivate {
	constructor(private readonly tokensService: TokensService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>()
		const token = getAccessTokenFromHeader(req)

		if (token)
			try {
				const payload = await this.tokensService.verifyAccess(token)
				req['payload'] = payload

				return true
				
			} catch (error) {
				if (error.name !== 'Error') 
					throw new UnauthorizedException(error)

				console.log(error)
				throw new InternalServerErrorException()
			}
		else
			throw new UnauthorizedException({
				name: ERROR.TYPE.AUTHORIZATION,
				message: ERROR.MESSAGE.AUTHORIZATION_HEADER_ABSENT
			})
	}
}
