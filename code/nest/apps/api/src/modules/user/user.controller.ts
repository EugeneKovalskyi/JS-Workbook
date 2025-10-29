import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common'
import type { UpdateUserDTO, CreateUserDTO } from './user.dto'
import type { UserResponse } from './user.types'
import { ROLE } from '#common/constants'
import { Role } from '#common/decorators'
import { AccessGuard } from '#common/guards/access.guard'
import { RoleGuard } from '#common/guards/role.guard'
import { UserService } from './user.service'

@Controller('user')
@UseGuards(AccessGuard, RoleGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@Role(ROLE.ADMIN)
	async createUser(@Body() dto: CreateUserDTO) {
		return this.userService.createUser(dto)
	}
	
	@Get('all')
	@Role(ROLE.ADMIN)
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Get(':id')
	@Role(ROLE.USER)
	async getUser(@Param('id', ParseIntPipe) id: number) {
		return this.userService.getUser(id)
	}

	@Put(':id')
	@Role(ROLE.USER)
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUserDTO
	) {
		return this.userService.updateUser(id, dto)
	}

	@Delete(':id')
	@Role(ROLE.USER)
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		await this.userService.deleteUser(id)
	}
}
