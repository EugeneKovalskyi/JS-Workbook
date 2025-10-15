import { Module } from '@nestjs/common';
import { FooController } from './Foo.controller';
import { FooService } from './Foo.service';

@Module({
  imports: [],
  controllers: [FooController],
  providers: [FooService],
})
export class FooModule {}
