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
import type { AuthJwtDTO, RefreshRequestDTO } from './jwt-auth.dto'
import { SAFE_COOKIE_OPTIONS } from '#common/constants'
import { Cookies } from '#common/decorators'
import { JwtAccessGuard } from '#common/guards/access.guard'
import { JwtRefreshGuard } from './jwt-auth-refresh.guard'
import { JwtAuthService } from './jwt-auth.service'

@Controller('auth/jwt')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('register')
  async register(
    @Headers('User-Agent') userAgent: string,
    @Body() dto: AuthJwtDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const {
      deviceId,
      tokens: { access, refresh }
    } = await this.jwtAuthService.register(userAgent, dto)
    
    res.cookie('refreshToken', refresh, SAFE_COOKIE_OPTIONS)
    res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

    return access
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Headers('User-Agent') userAgent: string,
    @Cookies('deviceId') clientDeviceId: number,
    @Body() dto: AuthJwtDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const {
      tokens: { access, refresh },
      deviceId
    } = await this.jwtAuthService.signIn(userAgent, clientDeviceId, dto)

    res.cookie('refreshToken', refresh, SAFE_COOKIE_OPTIONS)

    if (deviceId) 
      res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

    return access
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  @Post('signout')
  async signout(
    @Cookies('deviceId') clientDeviceId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.jwtAuthService.signOut(clientDeviceId)

    res.clearCookie('refreshToken')
    res.clearCookie('deviceId')
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() req: RefreshRequestDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      access,
      refresh
    } = await this.jwtAuthService.refresh(req.refreshId, req.payload)

    res.cookie('refreshToken', refresh, SAFE_COOKIE_OPTIONS)

    return access
  }
}
