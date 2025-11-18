import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { PasswordAuthController } from './password-auth.controller'
import { PasswordAuthService } from './password-auth.service'
import { TokensModule } from '#common/services/tokens/tokens.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [HttpModule, TokensModule, UserModule],
	controllers: [PasswordAuthController],
	providers: [PasswordAuthService],
})
export class PasswordAuthModule {}
