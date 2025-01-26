import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { AuthService } from 'src/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from './user.enum';

@Injectable()
export class UserService {
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

  async createUser(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    // Exclude the password field from the returned user object
    delete savedUser.password;

    return savedUser;
  }

  async getUser(getUser: { id?: string; email?: string; username?: string }): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: getUser.id,
        email: getUser.email,
        username: getUser.username,
      },
    });
  }

  async updateUserByAdmin(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUser: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateUser);
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
