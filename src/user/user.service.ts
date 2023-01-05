import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDto, UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserDto) {
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
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are taken');
        }
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.findUnique({
      where: {
        username: id,
      },
    });

    if (!user) {
      throw new ForbiddenException('This user does not exist.');
    }

    return this.prisma.user.update({
      where: {
        username: id,
      },
      data: {
        username: dto.username,
        email: dto.email,
        name: dto.name,
        code: dto.code,
        password: hash,
        rolename: dto.rolename,
        deactivationTime: dto.deactivationTime,
      },
    });
    // delete user.password;
    //return user;
  }

  async activate(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: id,
      },
    });

    if (!user) {
      throw new ForbiddenException('This user does not exist.');
    }

    if (user.deactivationTime == null) {
      throw new ForbiddenException('This user is active.');
    } else {
      return this.prisma.user.update({
        where: {
          username: id,
        },
        data: {
          deactivationTime: null,
        },
      });
    }
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  find(id: string) {
    return this.prisma.user.findUnique({
      where: {
        username: id,
      },
    });
  }

  findByRole(role: string) {
    return this.prisma.user.findMany({
      where: {
        rolename: role,
      },
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: id,
      },
    });

    if (!user) {
      throw new ForbiddenException('This user does not exist.');
    }

    if (user.deactivationTime != null) {
      throw new ForbiddenException('This user is already deactivated.');
    }
    return this.prisma.user.update({
      where: {
        username: id,
      },
      data: {
        deactivationTime: new Date(),
      },
    });
  }
}
