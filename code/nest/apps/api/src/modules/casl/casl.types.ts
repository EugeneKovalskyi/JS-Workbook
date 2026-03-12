import type { PureAbility } from '@casl/ability'
import type { User } from '@prisma/client'

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type Subjects = User | 'Casl' | 'all'
export type IAppAbility = PureAbility<[Actions, Subjects]>

export interface Ability {
	action: Actions,
	subject: Subjects
}

