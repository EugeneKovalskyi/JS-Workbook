import { NestFactory } from '@nestjs/core'
import { FooModule } from './foo.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { FOO_PACKAGE_NAME } from './types'

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(FooModule, {
		transport: Transport.GRPC,
    options: {
      package: FOO_PACKAGE_NAME,
      protoPath: join(__dirname, `proto/${FOO_PACKAGE_NAME}_services.proto`),
			url: 'localhost:50051'
    }
	})
	await app.listen()
}
bootstrap()
