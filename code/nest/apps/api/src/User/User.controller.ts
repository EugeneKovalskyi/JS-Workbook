import type { UpdateUserDTO, CreateUserDTO } from './dto'
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
import { Role } from '../common/decorators'
import { AccessGuard } from '../common/guards/Access.guard'
import { RoleGuard } from '../common/guards/Role.guard'
import { UserService } from './User.service'
import { ROLE } from '../common/constants'

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
