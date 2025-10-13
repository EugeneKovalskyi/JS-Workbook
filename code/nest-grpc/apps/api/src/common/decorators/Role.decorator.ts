import { SetMetadata } from '@nestjs/common'
import { ROLE_KEY } from '../constants'

export const Role = (role: number) => SetMetadata(ROLE_KEY, role)
