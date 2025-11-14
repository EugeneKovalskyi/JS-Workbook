import { Module } from '@nestjs/common'
import { JwtAuthController } from './jwt-auth.controller'
import { JwtAuthService } from './jwt-auth.service'
import { TokensModule } from '#common/services/tokens/tokens.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [TokensModule, UserModule],
	controllers: [JwtAuthController],
	providers: [JwtAuthService],
})
export class JwtAuthModule {}
