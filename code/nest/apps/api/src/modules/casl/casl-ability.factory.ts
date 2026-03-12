import type { Actions, Subjects } from './casl.types';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { AbilityBuilder, PureAbility } from '@casl/ability'

@Injectable()
export class CaslAbilityFactory {
	create(userRoles: RoleName[]) {
		const AppAbility = PureAbility<[Actions, Subjects]>
		const { can, cannot, build } = new AbilityBuilder(AppAbility)

		if (userRoles.includes(RoleName.ADMIN)) {
			can('manage', 'all')

			return build()
		}

		if (userRoles.includes(RoleName.SENIOR)) {
			can('manage', 'all')
			cannot('delete', 'all')

			return build()
		}

		if (userRoles.includes(RoleName.MIDDLE)) {
			can('manage', 'Casl')

			return build()
		}

		if (userRoles.includes(RoleName.JUNIOR)) {
			can('create', 'Casl')
			can('read', 'Casl')
			can('update', 'Casl')
			// can('read', User)
		}

		throw new InternalServerErrorException('User hasn\'t any role ')
	}
}
