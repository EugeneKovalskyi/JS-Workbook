import type { AccessRequest } from '../../Auth/types'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE } from '../constants'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<AccessRequest>()
		const role = ROLE[req.payload.role] as number
		const requiredRole = this.reflector.get<number>('ROLE', context.getHandler())

		if (role >= requiredRole)
			return true
		else
			return false
	}
}
