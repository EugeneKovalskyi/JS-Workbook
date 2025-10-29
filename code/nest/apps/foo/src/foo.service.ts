import { Injectable, NotFoundException } from '@nestjs/common'
import { catchError, Observable, Subject } from 'rxjs'
import { Foo, PostFooDTO, GetFooDTO, Time } from './types/foo_messages'

@Injectable()
export class FooService {
	private readonly foos: Foo[] = [
		{
			id: 1,
			name: 'Foo #1',
			isPending: true,
			user: {
				id: 11,
				name: 'User #11',
			},
		},
	]

	postFoo(dto: PostFooDTO): Foo {
		const lastFoo = this.foos[this.foos.length - 1]
		const userId = lastFoo.user!.id + 11
		const foo = {
			id: lastFoo.id + 1,
			name: dto.name,
			isPending: !lastFoo.isPending,
			user: {
				id: userId,
				name: 'User #' + userId,
			},
		}

		this.foos.push(foo)
		return foo
	}

	getFoo(dto: GetFooDTO): Foo {
		const foo = this.foos.find((foo) => foo.id === dto.id)

		if (foo) 
      return foo
		else 
      throw new NotFoundException(`Foo #${dto.id} not exists!`)
	}

	getTime(timeStream: Observable<Time>): Observable<Time> {
		const subject = new Subject<Time>()
		
		const next = ({ time }: Time) => {
			console.log(`Request time lag: ${Date.now() - time}`)
			subject.next({ time: Date.now() })
		}

		const complete = () => {
			console.log('Server completed!')
			subject.complete()
		}
		
		const error = (e: Error) => {
			console.log(e.message)
			catchError((err, caught) => caught)
			subject.complete()
		}
		
		timeStream.subscribe({ next, error, complete })
		
		setTimeout(() => subject.complete(), 2100)

		return subject.asObservable()
	}
}
