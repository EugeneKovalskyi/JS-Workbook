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
import { UserService } from './User.service'
import { AccessGuard } from '../common/guards/Access.guard'

@Controller('user')
@UseGuards(AccessGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() dto: CreateUserDTO) {
		return this.userService.createUser(dto)
	}
	
	@Get('all')
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Get(':id')
	async getUser(@Param('id', ParseIntPipe) id: number) {
		return this.userService.getUser(id)
	}

	@Put(':id')
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUserDTO
	) {
		return this.userService.updateUser(id, dto)
	}

	@Delete(':id')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		await this.userService.deleteUser(id)
	}
}
