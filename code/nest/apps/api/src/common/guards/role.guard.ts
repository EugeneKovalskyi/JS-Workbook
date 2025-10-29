import type { AccessRequest } from '#modules/auth/auth.types'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE } from '../constants'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<AccessRequest>()
		const role = Number(ROLE[req.payload.role])
		const requiredRole = this.reflector.get<number>('ROLE', context.getHandler())

//ISSUE
// Заменить на разрешения (permissions)
		if (role <= requiredRole)
			return true
		else
			return false
	}
}
