import { Controller, Get, Post, Body,  Param } from '@nestjs/common';
import { FooService } from './Foo.service';
import { PostFooDTO } from '../../../Foo/src/types';

@Controller('foo')
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Post()
  post(@Body() dto: PostFooDTO) {
    return this.fooService.postFoo(dto)
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.fooService.getFoo({ id: +id })
  }

  @Post('time')
  getTime() {
    this.fooService.getTime()
  }
}
