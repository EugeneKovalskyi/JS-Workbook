import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorLogInterceptor implements NestInterceptor {
	intercept(ctx: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			catchError(error => {
				console.log('\n\x1b[1;31mERROR:\x1b[0m')
        console.error(error.response || error)

				return throwError(() => error)
			})
		)
	}
}
