import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { CreateUserReqDTO, CreateUserResDTO, UpdateUserReqDTO } from './dto'
import { UserService } from './services/user.service'
import { AccessGuard } from '#common/guards/access.guard'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() dto: CreateUserReqDTO): Promise<CreateUserResDTO> {
		return this.userService.createUser(dto)
	}

	@Get()
	@UseGuards(AccessGuard)
	async getAllUsers(
		@Query('take', ParseIntPipe) take: number
	): Promise<CreateUserResDTO[]> {
		return this.userService.getAllUsers(take)
	}

	@Get(':id')
	@UseGuards(AccessGuard)
	async getUser(@Param('id', ParseIntPipe) id: number): Promise<CreateUserResDTO> {
		return this.userService.getUser(id)
	}

	@Patch(':id')
	@UseGuards(AccessGuard)
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUserReqDTO
	) {
		await this.userService.updateUser(id, dto)
	}

	@Delete(':id')
	@UseGuards(AccessGuard)
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		await this.userService.deleteUser(id)
	}
}
