import {
	BadRequestException,
	Catch,
	ExceptionFilter,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ERROR } from '../constants'

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
	catch(exception: PrismaClientKnownRequestError) {
		const code = exception.code
		const message = exception.message.split('\n').pop()?.split('. ').pop()

		console.log('\n\x1b[1;31mERROR\x1b[0m \x1b[3;34m[PrismaExceptionFilter]\x1b[0m:')
		console.error(exception)

		if (message) {
			switch (code) {
				case 'P2025':
					throw new NotFoundException(message)
				default:
					throw new BadRequestException(message)
			} 
		}

		throw new InternalServerErrorException(ERROR.MESSAGE.UNCAUGHT_EXCEPTION)
	}
}
