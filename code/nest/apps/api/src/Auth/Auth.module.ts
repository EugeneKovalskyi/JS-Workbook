import { Module } from '@nestjs/common'
import { AuthService } from './Auth.service'
import { AuthController } from './Auth.controller'
import { TokensModule } from '../common/services/Tokens/Tokens.module'
import { UserModule } from '../User/User.module'

@Module({
	imports: [TokensModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
