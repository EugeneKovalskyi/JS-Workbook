import {
	Catch,
	ExceptionFilter,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosError } from 'axios'
import type { GoogleTokenErrResData } from './types'
import { ERROR } from '#common/constants'

@Injectable()
@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
	private readonly tokenUrl: string
	private readonly verifyTokenUrl: string

	constructor(private readonly configService: ConfigService) {
		this.tokenUrl = this.configService.getOrThrow<string>(
			'GOOGLE_TOKEN_URL'
		)
		this.verifyTokenUrl = this.configService.getOrThrow<string>(
			'GOOGLE_VERIFY_TOKEN_URL'
		)
	}

	catch(exception: AxiosError) {
		const res = exception.response
		const url = res?.config.url?.split('?')[0]

		console.log('\n\x1b[1;31mERROR\x1b[0m \x1b[3;34m[AxiosExceptionFilter]\x1b[0m:')
		console.error(exception)

		if (url === this.tokenUrl) {
			const { error, error_description } = res?.data as GoogleTokenErrResData
			throw new UnauthorizedException(`${error}: ${error_description}`)
		}

		if (url === this.verifyTokenUrl)
			throw new UnauthorizedException(ERROR.MESSAGE.ACCESS_TOKEN_INVALID)

		throw new InternalServerErrorException(ERROR.MESSAGE.UNCAUGHT_EXCEPTION)
	}
}
