import { Module } from '@nestjs/common';
import { CaslController } from './casl.controller';

@Module({
	controllers: [CaslController]
})
export class CaslModule {}
