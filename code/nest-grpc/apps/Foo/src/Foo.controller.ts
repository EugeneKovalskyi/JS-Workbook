import { Controller } from '@nestjs/common';
import { FooService } from './Foo.service';
import { Foo, FooServiceController, FooServiceControllerMethods, GetFooDTO, PostFooDTO, Time } from './types';
import { Observable } from 'rxjs';

@Controller()
@FooServiceControllerMethods()
export class FooController implements FooServiceController {
  constructor(private readonly fooService: FooService) {}

  postFoo(dto: PostFooDTO): Foo {
    return this.fooService.postFoo(dto)
  }

  getFoo(dto: GetFooDTO): Foo {
    return this.fooService.getFoo(dto)
  }

  getTime(timeStream: Observable<Time>): Observable<Time> {
    return this.fooService.getTime(timeStream)
  }
}
