import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios'
import type {
	AccessTokenData,
	AuthResponse,
	TokensData,
	UserInfoFromIdToken,
} from './google-auth.types'
import { TokensService } from '#common/services/tokens/tokens.service'
import { UserSharedService } from '#modules/user/services/user-shared.service'
import { TOKEN_ORIGIN } from '#common/constants';

@Injectable()
export class GoogleAuthService {
	private readonly oauth2Url: string
	private readonly clientId: string
	private readonly redirectUri: string
	private readonly clientSecret: string
	private readonly tokenUrl: string

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
		private readonly jwtService: JwtService,
		private readonly tokensService: TokensService,
		private readonly userSharedService: UserSharedService
		
	) {
		this.oauth2Url = this.configService.getOrThrow<string>('GOOGLE_OAUTH2_URL')
		this.clientId = this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID')
		this.clientSecret = this.configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET')
		this.redirectUri = this.configService.getOrThrow<string>('GOOGLE_REDIRECT_URI')
		this.tokenUrl = this.configService.getOrThrow<string>('GOOGLE_TOKEN_URL')
	}

	getGoogleURL(): string {
		const options = new URLSearchParams({
			client_id: this.clientId,
			redirect_uri: this.redirectUri,
			response_type: 'code',
			access_type: 'offline',
			prompt: 'consent',
			scope: ['openid', 'email', 'profile'].join(' ')
		})

		return `${this.oauth2Url}?${options.toString()}`
	}

	async googleAuth(code: string, userAgent: string): Promise<AuthResponse> {
		const options = new URLSearchParams({
			code,
			client_id: this.clientId,
			client_secret: this.clientSecret,
			redirect_uri: this.redirectUri,
			grant_type: 'authorization_code',
		})

		const {
			data: {
				access_token: accessToken,
				refresh_token: refreshToken,
				id_token: idToken,
			},
		} = await firstValueFrom(
			this.httpService.request<TokensData>({
				method: 'POST',
				url: `${this.tokenUrl}?${options.toString()}`,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			})
		)

		const {
			name,
			email,
			picture
		} = this.jwtService.decode<UserInfoFromIdToken>(idToken)

		let user = await this.userSharedService.getUserByEmail(email)

		if (!user)
			user = await this.userSharedService.createUserByGoogle({ name, email })

		const deviceId = await this.userSharedService.createDevice(userAgent, user.id)

		await this.tokensService.createRefreshToken(
			refreshToken,
			TOKEN_ORIGIN.GOOGLE,
			deviceId
		)

		return {
			deviceId,
			refreshToken,
			tokenInfo: {
				accessToken,
				name,
				email,
				picture
			}
		}
	}

	async getAccessToken(refreshToken: string): Promise<string> {
		const body = new URLSearchParams({
			client_id: this.clientId,
			client_secret: this.clientSecret,
			refresh_token: refreshToken,
			grant_type: 'refresh_token',
		})

		const { data } = await firstValueFrom(
			this.httpService.request<AccessTokenData>({
				method: 'POST',
				url: this.tokenUrl,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: body
			}
		))

		return data.access_token
	}
}