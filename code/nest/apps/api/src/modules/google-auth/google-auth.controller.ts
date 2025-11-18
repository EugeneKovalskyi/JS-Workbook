import type { Request, Response } from 'express'
import {
	Controller,
	Get,
	Headers,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import type { TokenInfo } from './google-auth.types'
import { SAFE_COOKIE_OPTIONS, TOKEN_ORIGIN } from '#common/constants'
import { GoogleAuthService } from './google-auth.service'
import { AccessGuard } from '#common/guards/access.guard'
import { Cookies } from '#common/decorators'

@Controller('auth/google')
export class GoogleAuthController {
	private userAgent: string

	constructor(private readonly googleAuthService: GoogleAuthService) {}

	@Get()
	googleRedirect(
		@Headers('User-Agent') userAgent: string,
		@Res() res: Response
	) {
		const url = this.googleAuthService.getGoogleURL()

		//* Перейти по ссылке, если запрос от Postman
		console.log(url)

		this.userAgent = userAgent

		res.redirect(url)
	}

	@Get('callback')
	async googleAuth(
		@Query('code') code: string,
		@Res({ passthrough: true }) res: Response
	): Promise<TokenInfo> {
		const {
			deviceId,
			refreshToken, 
			tokenInfo
		} = await this.googleAuthService.googleAuth(code, this.userAgent)

		res.cookie('refreshToken', refreshToken, SAFE_COOKIE_OPTIONS)
		res.cookie('tokenOrigin', TOKEN_ORIGIN.GOOGLE, SAFE_COOKIE_OPTIONS)
		res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

		return tokenInfo
	}

  @Get('token')
  async getAccessToken(@Req() req: Request): Promise<string> {
		const refreshToken = String(req.cookies.refreshToken)

		return this.googleAuthService.getAccessToken(refreshToken)
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AccessGuard)
	@Post('signout')
	async signout(
		@Cookies('deviceId') clientDeviceId: number,
		@Res({ passthrough: true }) res: Response
	) {
		await this.googleAuthService.signOut(clientDeviceId)

		res.clearCookie('refreshToken')
		res.clearCookie('tokenOrigin')
		res.clearCookie('deviceId')
	}
}
