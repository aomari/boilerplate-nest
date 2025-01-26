import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth';
import { UserStatus } from 'src/user';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createUserByAdmin(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      status: UserStatus.ACTIVE,
    });
    const savedUser = await this.userRepository.save(newUser);
    delete savedUser.password;
    return savedUser;
  }

  async updateUserByAdmin(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(paginationDto: PaginationDto) {
    const { page = 1, limit = 30 } = paginationDto;
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await this.userRepository.findAndCount({
      skip,
      take: limit,
    });

    return {
      totalUsers,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    };
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
