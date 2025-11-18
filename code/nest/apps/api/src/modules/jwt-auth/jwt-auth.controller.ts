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
import type { AuthJwtDTO, RefreshTokenRequestDTO } from './jwt-auth.dto'
import { SAFE_COOKIE_OPTIONS } from '#common/constants'
import { Cookies } from '#common/decorators'
import { JwtRefreshGuard } from './jwt-auth-refresh.guard'
import { JwtAuthService } from './jwt-auth.service'
import { AccessGuard } from '#common/guards/access.guard'

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
      tokens: { accessToken, refreshToken }
    } = await this.jwtAuthService.register(userAgent, dto)
    
    res.cookie('refreshToken', refreshToken, SAFE_COOKIE_OPTIONS)
    res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

    return accessToken
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
      tokens: { accessToken, refreshToken },
      deviceId
    } = await this.jwtAuthService.signIn(userAgent, clientDeviceId, dto)

    res.cookie('refreshToken', refreshToken, SAFE_COOKIE_OPTIONS)

    if (deviceId) 
      res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

    return accessToken
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessGuard)
  @Post('signout')
  async signout(
    @Cookies('deviceId') deviceId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.jwtAuthService.signOut(deviceId)

    res.clearCookie('refreshToken')
    res.clearCookie('tokenOrigin')
    res.clearCookie('deviceId')
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() req: RefreshTokenRequestDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      accessToken,
      refreshToken
    } = await this.jwtAuthService.refresh(req.refreshTokenId, req.payload)

    res.cookie('refreshToken', refreshToken, SAFE_COOKIE_OPTIONS)

    return accessToken
  }
}
