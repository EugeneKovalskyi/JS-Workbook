import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class SeedService implements OnModuleInit {
	private readonly logger = new Logger(SeedService.name)

	constructor(private readonly prismaService: PrismaService) {}

	async onModuleInit() {
		await this.seed()
	}

	private async seed() {
		try {
			await this.prismaService.$executeRaw`
				INSERT INTO users (id, name, email, password)
				VALUES (1, 'admin', 'tarantul.battlefield@gmail.com', 'admin')
				ON CONFLICT DO NOTHING;
			`

			await this.prismaService.$executeRaw`
				INSERT INTO roles (id, name) 
				VALUES (1, 'admin'), (2, 'junior'), (3, 'middle'), (4, 'senior')
				ON CONFLICT DO NOTHING;
			`

			await this.prismaService.$executeRaw`
				INSERT INTO users_roles (user_id, role_id) VALUES (1, 1)
				ON CONFLICT DO NOTHING;
			`

			this.logger.log('Seeding completed')
		} catch(error) {
			this.logger.error('Seeding error:', error)
		}
	}
}
