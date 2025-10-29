import type { Response } from 'express'
import { 
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import type { AuthDTO } from './auth.dto'
import type { RefreshRequest } from './auth.types'
import { SAFE_COOKIE_OPTIONS } from '#common/constants'
import { Cookies } from '#common/decorators'
import { AccessGuard } from '#common/guards/access.guard'
import { RefreshGuard } from './guards/refresh.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Headers('User-Agent') userAgent: string,
    @Body() dto: AuthDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const {
      deviceId,
      tokens: { access, refresh }
    } = await this.authService.register(userAgent, dto)
    
    res.cookie('refresh', refresh, SAFE_COOKIE_OPTIONS)
    res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

    return access
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Headers('User-Agent') userAgent: string,
    @Cookies('deviceId') clientDeviceId: number,
    @Body() dto: AuthDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const {
      tokens: { access, refresh },
      deviceId
    } = await this.authService.signIn(userAgent, clientDeviceId, dto)

    res.cookie('refresh', refresh, SAFE_COOKIE_OPTIONS)

    if (deviceId)
      res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

    return access
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessGuard)
  @Post('signout')
  async signout(
    @Cookies('deviceId') clientDeviceId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.authService.signOut(clientDeviceId)

    res.clearCookie('refresh')
    res.clearCookie('deviceId')
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() req: RefreshRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      access,
      refresh
    } = await this.authService.refresh(req.refreshId, req.payload)

    res.cookie('refresh', refresh, SAFE_COOKIE_OPTIONS)

    return access
  }
}
