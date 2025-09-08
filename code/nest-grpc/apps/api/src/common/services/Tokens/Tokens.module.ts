import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TokensService } from './Tokens.service'

@Module({
	providers: [
		{
			provide: 'JWT_ACCESS',
			inject: [ConfigService],
			useFactory: (configService: ConfigService) =>
				new JwtService({
					secret: configService.get<string>('JWT_ACCESS_SECRET'),
					signOptions: { expiresIn: '15m' },
				}),
		},
		{
			provide: 'JWT_REFRESH',
			inject: [ConfigService],
			useFactory: (configService: ConfigService) =>
				new JwtService({
					secret: configService.get<string>('JWT_REFRESH_SECRET'),
					signOptions: { expiresIn: '7d' },
				}),
		},

		TokensService
	],
	
	exports: [
		'JWT_ACCESS',
		'JWT_REFRESH',
		TokensService
	],
})
export class TokensModule {}
