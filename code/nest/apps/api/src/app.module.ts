import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '#common/services/prisma/prisma.module';
import { UserModule } from '#modules/user/user.module';
import { FooModule } from '#modules/foo/foo.module';
import { GoogleAuthModule } from '#modules/google-auth/google-auth.module';
import { JwtAuthModule } from '#modules/jwt-auth/jwt-auth.module';
import { ErrorLogInterceptor } from '#common/interceptors/error-log.interceptor';
import { AxiosExceptioFilter } from '#common/filters/axios-exception.filter';
import { PrismaExceptionFilter } from '#common/filters/prisma-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: ['./apps/api/.env']
    }),
    PrismaModule,
    UserModule,
    FooModule,
    JwtAuthModule,
    GoogleAuthModule,
  ],
  controllers: [],
  providers: [
    ErrorLogInterceptor,
    AxiosExceptioFilter,
    PrismaExceptionFilter
  ],
})
export class AppModule {}
