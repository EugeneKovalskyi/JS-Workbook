import { catchError, ReplaySubject } from 'rxjs'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { FooServiceClient, FOO_SERVICE_NAME } from './types/foo_services'
import { FOO_PACKAGE_NAME, PostFooDTO, GetFooDTO, Time } from './types/foo_messages'

@Injectable()
export class FooService implements OnModuleInit {
	private fooService: FooServiceClient

	constructor(@Inject(FOO_PACKAGE_NAME) private client: ClientGrpc) {}

	onModuleInit() {
		this.fooService = this.client.getService<FooServiceClient>(FOO_SERVICE_NAME)
	}

	postFoo(dto: PostFooDTO) {
		return this.fooService.postFoo(dto)
	}

	getFoo(dto: GetFooDTO) {
		return this.fooService.getFoo(dto)
	}

	getTime() {
		const replySubject = new ReplaySubject<Time>()
		
		const next = ({ time }: Time) => {
			console.log(`Response time lag: ${Date.now() - time}`)
		}

		const complete = () => {
			console.log('Client completed!')
			clearInterval(interval)
			replySubject.complete()
		}
		
		const error = (e: Error) => {
			console.log(e.message)
			catchError((err, caught) => caught)
			replySubject.complete()
		}

		const interval = setInterval(() => {
			replySubject.next({ time: Date.now() })
		}, 1000)

		this.fooService.getTime(replySubject).subscribe({ next, error, complete})
		
		setTimeout(() => {
			clearInterval(interval)
			replySubject.complete()
		}, 5100)
	}
}