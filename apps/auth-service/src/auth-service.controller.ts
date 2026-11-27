import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { LoginUserDto, RegisterUserDto } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authServiceService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authServiceService.login(loginUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: { userId: string }) {
    return this.authServiceService.getProfile(req.userId);
  }
}
