import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/services/Prisma/Prisma.module';
import { AuthModule } from './Auth/Auth.module';
import { FooModule } from './Foo/Foo.module';
import { UserModule } from './User/User.module';

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
