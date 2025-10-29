import type { User } from '@prisma/client';

export type UserResponse = Omit<User, 'password'>