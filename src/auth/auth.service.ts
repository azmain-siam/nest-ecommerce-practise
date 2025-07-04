import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: RegisterDto): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      const data = {
        ...createUserDto,
        password: hashedPassword,
      };

      return await this.prisma.user.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const fields = (error.meta?.target as string[])?.join(', ') || 'field';
        throw new ConflictException(`User with this ${fields} already exists.`);
      }

      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    try {
      const existing = await this.prisma.user.findFirst({ where: { email } });
      if (!existing) {
        throw new NotFoundException('User not found!');
      }

      const isMatches = await bcrypt.compare(password, existing.password);
      if (!isMatches) {
        throw new UnauthorizedException('incorrect email or password!');
      }

      const payload = {
        email: existing.email,
      };

      const accessToken = await this.jwtService.signAsync(payload);
      return {
        accessToken,
      };
    } catch (error) {
      return error;
    }
  }
}
