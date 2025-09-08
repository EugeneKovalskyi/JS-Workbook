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
		const { message, code } = exception
		const cause = message.split('\n').pop()?.split('. ').pop()

		if (cause) {
			if (code === 'P2025') 
				throw new NotFoundException(cause)

			throw new BadRequestException(cause)
		} else 
			throw new InternalServerErrorException(ERROR.MESSAGE.UNCAUGHT_EXCEPTION)
	}
}
