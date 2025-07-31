import { NestFactory } from '@nestjs/core'
import { FooModule } from './foo.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
// import { HealthImplementation, protoPath as healthCheckProtoPath } from 'grpc-health-check'
import { join } from 'path'
import { FOO_PACKAGE_NAME } from './types'

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(FooModule, {
		transport: Transport.GRPC,
    options: {
      package: FOO_PACKAGE_NAME,
      protoPath: [
				// healthCheckProtoPath,
				join(__dirname, `proto/${FOO_PACKAGE_NAME}_services.proto`),
			],
			// onLoadPackageDefinition: (pkg, server) => {
			// 	const healthImpl = new HealthImplementation({
			// 		'': 'UNKNOWN',
			// 		[FOO_PACKAGE_NAME]: 'UNKNOWN'
			// 	})

			// 	healthImpl.addToServer(server)
			// 	healthImpl.setStatus('', 'SERVING')
			// },
			url: 'localhost:50051'
    }
	})
	await app.listen()
}
bootstrap()
