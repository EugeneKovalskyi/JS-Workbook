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
import { JwtAccessGuard } from '#common/guards/access.guard'
import { GoogleAccessGuard } from '#common/guards/google-access.guard'
import { RoleGuard } from '#common/guards/role.guard'
import { UserService } from './services/user.service'
import { CreateUserReqDto, CreateUserResDto, UpdateUserReqDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() dto: CreateUserReqDto): Promise<CreateUserResDto> {
		return this.userService.createUser(dto)
	}

	//ISSUE ошибка не проходит в логи
	@Get('all')
	@UseGuards(GoogleAccessGuard)
	// @UseGuards(JwtAccessGuard)
	async getAllUsers(@Query('take', ParseIntPipe) take: number) {
		return this.userService.getAllUsers(take)
	}

	@Get(':id')
	@UseGuards(JwtAccessGuard)
	async getUser(@Param('id', ParseIntPipe) id: number) {
		return this.userService.getUser(id)
	}

	@Patch(':id')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Role(ROLE.USER)
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUserReqDto) {
		await this.userService.updateUser(id, dto)
	}

	@Delete(':id')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Role(ROLE.USER)
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		await this.userService.deleteUser(id)
	}
}
