import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { AccessTokenRequestDTO } from '#modules/jwt-auth/jwt-auth.dto'
import { ROLE } from '../constants'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(ctx: ExecutionContext): boolean {
		const req = ctx.switchToHttp().getRequest<AccessTokenRequestDTO>()
		const role = Number(ROLE[req.payload.role])
		const requiredRole = this.reflector.get<number>('ROLE', ctx.getHandler())

//ISSUE
// Заменить на разрешения (permissions)
		if (role <= requiredRole)
			return true
		else
			return false
	}
}
