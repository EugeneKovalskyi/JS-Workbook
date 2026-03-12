import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '#common/services/prisma/prisma.module';
import { SeedModule } from '#common/services/seed/seed.module';
import { UserModule } from '#modules/user/user.module';
import { FooModule } from '#modules/foo/foo.module';
import { GoogleAuthModule } from '#modules/google-auth/google-auth.module';
import { PasswordAuthModule } from '#modules/password-auth/password-auth.module';
import { AxiosExceptionFilter } from '#common/filters/axios-exception.filter';
import { PrismaExceptionFilter } from '#common/filters/prisma-exception.filter';
import { CaslModule } from './modules/casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: ['./apps/api/.env']
    }),
    PrismaModule,
    SeedModule,
    UserModule,
    FooModule,
    PasswordAuthModule,
    GoogleAuthModule,
    CaslModule,
  ],
  controllers: [],
  providers: [
    AxiosExceptionFilter,
    PrismaExceptionFilter
  ],
})
export class AppModule {}
