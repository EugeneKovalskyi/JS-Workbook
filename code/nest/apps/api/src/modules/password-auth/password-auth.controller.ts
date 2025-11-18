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
import type { PasswordAuthDTO, RefreshTokenRequestDTO } from './password-auth.dto'
import { SAFE_COOKIE_OPTIONS } from '#common/constants'
import { Cookies } from '#common/decorators'
import { RefreshGuard } from './password-auth-refresh.guard'
import { PasswordAuthService } from './password-auth.service'
import { AccessGuard } from '#common/guards/access.guard'

@Controller('auth/password')
export class PasswordAuthController {
  constructor(private readonly passwordAuthService: PasswordAuthService) {}

  @Post('register')
  async register(
    @Headers('User-Agent') userAgent: string,
    @Body() dto: PasswordAuthDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const {
      deviceId,
      tokens: { accessToken, refreshToken }
    } = await this.passwordAuthService.register(userAgent, dto)
    
    res.cookie('refreshToken', refreshToken, SAFE_COOKIE_OPTIONS)
    res.cookie('deviceId', deviceId, SAFE_COOKIE_OPTIONS)

    return accessToken
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Headers('User-Agent') userAgent: string,
    @Cookies('deviceId') clientDeviceId: number,
    @Body() dto: PasswordAuthDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const {
      tokens: { accessToken, refreshToken },
      deviceId
    } = await this.passwordAuthService.signIn(userAgent, clientDeviceId, dto)

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
    await this.passwordAuthService.signout(deviceId)

    res.clearCookie('refreshToken')
    res.clearCookie('tokenOrigin')
    res.clearCookie('deviceId')
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() req: RefreshTokenRequestDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      accessToken,
      refreshToken
    } = await this.passwordAuthService.refresh(req.refreshTokenId, req.payload)

    res.cookie('refreshToken', refreshToken, SAFE_COOKIE_OPTIONS)

    return accessToken
  }
}
