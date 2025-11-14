import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaExceptionFilter } from '#common/filters/prisma-exception.filter'
import { AxiosExceptioFilter } from '#common/filters/axios-exception.filter'
import { ErrorLogInterceptor } from '#common/interceptors/error-log.interceptor'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const API_PORT = configService.get<number>('API_PORT')
	const errorLogInterceptor = app.get(ErrorLogInterceptor)
	const axiosExceptioFilter = app.get(AxiosExceptioFilter)
	const prismaExceptionFilter = app.get(PrismaExceptionFilter)

	app.useGlobalInterceptors(errorLogInterceptor)
	app.useGlobalFilters(axiosExceptioFilter, prismaExceptionFilter)
	app.use(cookieParser())

	await app.listen(
		API_PORT || 3000, 
		() => console.log(`\nListening port:  ${API_PORT}\n`))
}
bootstrap()
