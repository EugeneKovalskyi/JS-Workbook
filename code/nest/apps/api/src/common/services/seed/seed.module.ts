import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SeedService } from './seed.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
