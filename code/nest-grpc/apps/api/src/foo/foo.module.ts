import { Module } from '@nestjs/common';
import { FooService } from './foo.service';
import { FooController } from './foo.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FOO_PACKAGE_NAME } from '../../../foo/src/types';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FOO_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: FOO_PACKAGE_NAME,
          protoPath: join(__dirname, `../foo/proto/${FOO_PACKAGE_NAME}_services.proto`),
			    url: 'localhost:50051'
        }
      }
    ])
  ],
  controllers: [FooController],
  providers: [FooService],
})
export class FooModule {}
