import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignDto } from './dto';
import * as argon from 'argon2';
import { debugPort } from 'process';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          name: dto.name,
          code: dto.code,
          password: hash,
          rolename: dto.rolename,
        },
      });

      return this.signToken(user.rolename, user.username);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SignDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    if (user.deactivationTime != null) {
      throw new ForbiddenException('This user has been deactivated.');
    }

    return this.signToken(user.rolename, user.username);
  }

  async signToken(
    role: string,
    username: string,
  ): Promise<{ roles: string; access_token: string }> {
    const payload = {
      role,
      username,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      roles: role,
      access_token: token,
    };
  }
}
