import { Controller, Get, Post, Body,  Param } from '@nestjs/common'
import { FooService } from './foo.service'
import { PostFooDTO } from './types/foo_messages'

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
