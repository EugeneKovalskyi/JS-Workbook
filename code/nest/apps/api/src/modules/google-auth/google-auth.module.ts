import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { TokensModule } from '#common/services/tokens/tokens.module';
import { UserModule } from '#modules/user/user.module';

@Module({
  imports: [HttpModule, TokensModule, UserModule],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, JwtService]
})
export class GoogleAuthModule {}
