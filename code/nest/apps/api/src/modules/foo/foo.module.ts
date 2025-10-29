import { join } from 'path'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { FOO_PACKAGE_NAME } from './types/foo_messages'
import { FooController } from './foo.controller'
import { FooService } from './foo.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: FOO_PACKAGE_NAME,
				transport: Transport.GRPC,
				options: {
					package: FOO_PACKAGE_NAME,
					protoPath: join(__dirname, `proto/${FOO_PACKAGE_NAME}/${FOO_PACKAGE_NAME}_services.proto`),
					url: 'localhost:50051',
				},
			},
		]),
	],
	controllers: [FooController],
	providers: [FooService],
})
export class FooModule {}
