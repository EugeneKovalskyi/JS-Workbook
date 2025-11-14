import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios';
import { TokensModule } from '#common/services/tokens/tokens.module';
import { PrismaModule } from '#common/services/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserSharedService } from './services/user-shared.service';
import { UserPasswordService } from './services/user-password.service';

@Module({
	imports: [HttpModule, TokensModule, PrismaModule],
	controllers: [UserController],
	providers: [UserService, UserSharedService, UserPasswordService],
	exports: [UserService, UserSharedService]
})
export class UserModule {}
