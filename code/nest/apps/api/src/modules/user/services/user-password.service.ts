import { ConflictException, Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt'
import { PrismaService } from '#common/services/prisma/prisma.service';
import { ERROR } from '#common/constants';
import { PasswordsDTO } from '../dto/passwords.dto';

@Injectable()
export class UserPasswordService {
	constructor(private readonly prismaService: PrismaService) {}

	async hash(password: string): Promise<string> {
		const salt = await genSalt(10)

		return hash(password, salt)
	}

	async update(id: number, passwords: PasswordsDTO): Promise<string> {
		const { oldPassword, newPassword } = passwords
		const { password } = await this.prismaService.user.findFirstOrThrow({
			where: { id },
			select: { password: true },
		})

		if (!password)
			throw new ConflictException(ERROR.MESSAGE.PASSWORD_ABSENT)

		const isPasswordCorrect = await compare(oldPassword, password)

		if (!isPasswordCorrect)
			throw new ConflictException(ERROR.MESSAGE.PASSWORD_WRONG)

		return this.hash(newPassword)	
	}
}