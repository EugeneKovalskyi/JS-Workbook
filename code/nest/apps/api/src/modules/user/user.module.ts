import { Module } from '@nestjs/common'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokensModule } from '#common/services/tokens/tokens.module';
import { UserShared } from './shared/user.shared';

@Module({
	imports: [TokensModule],
	controllers: [UserController],
	providers: [UserService, UserShared],
	exports: [UserService, UserShared]
})
export class UserModule {}
