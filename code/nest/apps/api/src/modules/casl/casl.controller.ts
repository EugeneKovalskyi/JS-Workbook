import { Controller, Get, Post, Patch, Delete, UseGuards } from '@nestjs/common'
import { Abilities } from '#common/decorators';

@Controller('casl')
// @UseGuards(CaslGuard)
export class CaslController {
	@Post()
	post() {}

	@Get()
	get() {}

	@Patch()
	pathc() {}

	@Delete()
	delete() {}

	// @Get()
	// @Abilities([{ action: 'read', subject: 'User' }])
	// getFoo() {}
}
