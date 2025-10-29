import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { FooModule } from './foo.module'
import { FOO_PACKAGE_NAME } from './types/foo_messages'

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(FooModule, {
		transport: Transport.GRPC,
    options: {
      package: FOO_PACKAGE_NAME,
      protoPath: [
				join(__dirname, `proto/${FOO_PACKAGE_NAME}_services.proto`)
			],
			url: 'localhost:50051'
    }
	})

	await app.listen()

	console.log('\nfoo-microservice is listening on PORT : 50051\n')
}
bootstrap()
