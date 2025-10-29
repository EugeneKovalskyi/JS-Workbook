import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const API_PORT = configService.get<number>('API_PORT')

	app.useGlobalFilters(new PrismaExceptionFilter())
	app.use(cookieParser())
	app.enableCors({
		origin: 'http://localhost:3020',
		credentials: true,
	})

	await app.listen(
		API_PORT || 3000, 
		() => console.log(`\nListening port:  ${API_PORT}\n`))
}
bootstrap()
