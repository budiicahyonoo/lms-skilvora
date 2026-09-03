// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private prisma: PrismaService,
//     private jwtService: JwtService,
//   ) {}

//   // 1. Validasi kredensial (Email & Password)
//   async validateUser(email: string, pass: string): Promise<any> {
//     const user = await this.prisma.user.findUnique({
//       where: { email },
//     });

//     if (user && user.password && (await bcrypt.compare(pass, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   // 2. Generate Tokens (Access & Refresh)
//   async login(user: any) {
//     const payload = { 
//       email: user.email, 
//       sub: user.id, 
//       role: user.role // PERBAIKAN: role adalah string, bukan object
//     };

//     // Access token untuk dikirim ke memory frontend
//     const accessToken = this.jwtService.sign(payload);
    
//     // Refresh token untuk disimpan di HTTP-Only Cookie (umur 7 hari)
//     const refreshToken = this.jwtService.sign(payload, {
//       secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-cahyodev',
//       expiresIn: '7d',
//     });

//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role, // PERBAIKAN: disesuaikan menjadi string
//       },
//       access_token: accessToken, // PERBAIKAN: disamakan dengan tarikan Next.js
//       refreshToken,
//     };
//   }
// }

import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 1. Register User Baru
  async register(email: string, password: string, name?: string) {
    // Cek apakah email sudah digunakan
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Role otomatis STUDENT karena register umum
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: 'STUDENT',
      },
    });

    // Jangan pernah mengirim password ke frontend
    const { password: _, ...result } = user;

    return result;
  }

  // 2. Validasi kredensial (Email & Password)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // 3. Generate Tokens (Access & Refresh)
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    // Access token
    const accessToken = this.jwtService.sign(payload);

    // Refresh token
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-cahyodev',
      expiresIn: '7d',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      access_token: accessToken,
      refreshToken,
    };
  }
}
