import { Inject, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common'
import { 
	FOO_PACKAGE_NAME, 
	FOO_SERVICE_NAME, 
	FooServiceClient,
	GetFooDTO,
	PostFooDTO,
	Time
} from '../../../foo/src/types'
import { ClientGrpc } from '@nestjs/microservices'
import { catchError, ReplaySubject } from 'rxjs'

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
			console.log('Stream completed from server!')
			replySubject.complete()
		}
		
		const error = (e: Error) => {
			console.log(e.message)
			catchError((err, caught) => caught)
		}

		const interval = setInterval(() => replySubject.next({ time: Date.now() }), 1000)
		
		this.fooService.getTime(replySubject).subscribe({ next, complete, error})
		setTimeout(() => {
			clearInterval(interval)
			replySubject.complete()
		}, 5050)
	}
}
