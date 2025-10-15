import type { Request } from 'express'

export default (req: Request): string | undefined => {
	const [type, token] = req.headers.authorization?.split(' ') ?? []

	return type === 'Bearer' ? token : undefined
}