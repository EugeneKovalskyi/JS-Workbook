import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';
import { FooService } from './foo.service';
import { FooServiceController, FooServiceControllerMethods } from './types/foo_services';
import { Foo, GetFooDTO, PostFooDTO, Time } from './types/foo_messages';


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
