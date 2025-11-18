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
import { ROLE } from '#common/constants'
import { Role } from '#common/decorators'
import { RoleGuard } from '#common/guards/role.guard'
import { UserService } from './services/user.service'
import { CreateUserReqDto, CreateUserResDto, UpdateUserReqDto } from './user.dto'
import { AccessGuard } from '#common/guards/access.guard'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() dto: CreateUserReqDto): Promise<CreateUserResDto> {
		return this.userService.createUser(dto)
	}

	@Get('all')
	@UseGuards(AccessGuard)
	async getAllUsers(@Query('take', ParseIntPipe) take: number) {
		return this.userService.getAllUsers(take)
	}

	@Get(':id')
	@UseGuards(AccessGuard)
	async getUser(@Param('id', ParseIntPipe) id: number) {
		return this.userService.getUser(id)
	}

	@Patch(':id')
	@UseGuards(AccessGuard, RoleGuard)
	@Role(ROLE.USER)
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUserReqDto) {
		await this.userService.updateUser(id, dto)
	}

	@Delete(':id')
	@UseGuards(AccessGuard, RoleGuard)
	@Role(ROLE.USER)
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		await this.userService.deleteUser(id)
	}
}
