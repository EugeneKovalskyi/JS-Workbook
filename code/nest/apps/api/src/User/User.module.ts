import { Module } from '@nestjs/common'
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { TokensModule } from '../common/services/Tokens/Tokens.module';
import { UserShared } from './shared/User.shared';

@Module({
	imports: [TokensModule],
	controllers: [UserController],
	providers: [UserService, UserShared],
	exports: [UserService, UserShared]
})
export class UserModule {}
