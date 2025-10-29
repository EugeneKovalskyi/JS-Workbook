import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TokensModule } from '#common/services/tokens/tokens.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [TokensModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
