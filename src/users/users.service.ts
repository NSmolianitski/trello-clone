import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(registerDto.password, salt);

    const user = new User();
    user.name = registerDto.name;
    user.email = registerDto.email;
    user.password = hash;

    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
