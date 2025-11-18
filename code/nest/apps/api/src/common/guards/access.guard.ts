import type { Request } from 'express'
import { firstValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common'
import type { Payload } from '#common/services/tokens/tokens.types'
import type { GoogleAccessTokenInfo } from '#modules/google-auth/google-auth.types'
import { ERROR, TOKEN_ORIGIN } from '#common/constants'
import { TokensService } from '../services/tokens/tokens.service'
import { getAccessTokenFromHeader } from '#common/utils'

@Injectable()
export class AccessGuard implements CanActivate {
	private readonly verifyTokenUrl: string

	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly tokensService: TokensService
	) {
		this.verifyTokenUrl = this.configService.getOrThrow<string>(
			'GOOGLE_VERIFY_TOKEN_URL'
		)
	}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const req = ctx.switchToHttp().getRequest<Request>()
		const token = getAccessTokenFromHeader(req)
		const origin = String(req.cookies.tokenOrigin)
		let payload: Payload | undefined

		if (!token)
			throw new UnauthorizedException(ERROR.MESSAGE.AUTHORIZATION_HEADER_ABSENT)

		if (!origin)
			throw new UnauthorizedException(ERROR.MESSAGE.TOKEN_ORIGIN_ABSENT)

		switch(origin) {
			case TOKEN_ORIGIN.PASSWORD:
				try {
					payload = await this.tokensService.verifyAccessToken(token)
					break
				} catch (error) {
					throw new UnauthorizedException(error)
				}

			case TOKEN_ORIGIN.GOOGLE:
				await firstValueFrom(
					this.httpService.get<GoogleAccessTokenInfo>(
						`${this.verifyTokenUrl}?access_token=${token}`
					)
				)
				break

			default:
				throw new InternalServerErrorException(ERROR.MESSAGE.TOKEN_ORIGIN_INVALID)
		}

		req['payload'] = payload

		return true
	}
}
