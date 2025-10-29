import { Module } from '@nestjs/common';
import { PrismaModule } from './common/services/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FooModule } from './modules/foo/foo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: ['./apps/api/.env']
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    FooModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
