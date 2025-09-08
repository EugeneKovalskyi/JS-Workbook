import type { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest<Request>()

	if (data)
		return Number(req.cookies?.[data])
	else 
		return req.cookies
})
