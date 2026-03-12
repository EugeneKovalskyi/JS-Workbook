import type { Ability } from '#modules/casl/casl.types'
import { SetMetadata } from '@nestjs/common'

export const ABILITIES_KEY = 'abilities'

export const Abilities = (abilities: Ability[]) => {
	return SetMetadata(ABILITIES_KEY, abilities)
}