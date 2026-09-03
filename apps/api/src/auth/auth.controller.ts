import { Controller, Post, Body, UnauthorizedException, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { email, password, name } = body;

    if (!email || !password) {
      throw new UnauthorizedException('Email dan Password wajib diisi');
    }

    return this.authService.register(email, password, name);
  }

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Email atau Password salah');
    }

    const tokens = await this.authService.login(user);

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login berhasil',
      user: tokens.user,
      access_token: tokens.access_token,
    };
  }

  // --- ENDPOINT BARU UNTUK MENGAMBIL PROFIL ---
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any) {
    // JWT Guard otomatis mengekstrak payload token dan menyisipkannya ke req.user
    return req.user;
  }

  // --- GOOGLE OAUTH ROUTES ---
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const tokens = await this.authService.login(req.user);

    // DIPERBARUI: Nama cookie diubah dari 'access_token' menjadi 'token'
    // agar sinkron dengan file proxy.ts di Next.js
    res.cookie('token', tokens.access_token, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, 
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect('http://localhost:3000/dashboard');
  }
}