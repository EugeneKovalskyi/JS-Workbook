import type { Request } from 'express'
import { firstValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import type { GoogleAccessTokenInfo } from '#modules/google-auth/google-auth.types'
import { ERROR } from '#common/constants'
import { getAccessTokenFromHeader } from '#common/utils'

@Injectable()
export class GoogleAccessGuard implements CanActivate {
	private readonly verifyTokenUrl: string

	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {
		this.verifyTokenUrl = this.configService.getOrThrow<string>(
			'GOOGLE_VERIFY_TOKEN_URL'
		)
	}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const req = ctx.switchToHttp().getRequest<Request>()
		const token = getAccessTokenFromHeader(req)

		if (!token)
			throw new UnauthorizedException(ERROR.MESSAGE.ACCESS_TOKEN_ABSENT)

		await firstValueFrom(
			this.httpService.get<GoogleAccessTokenInfo>(
				`${this.verifyTokenUrl}?access_token=${token}`
			)
		)

		return true
	}
}
