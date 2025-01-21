import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    // Exclude the password field from the returned user object
    delete savedUser.password;

    return savedUser;
  }

  async getUser(getUser: {
    id?: string;
    email?: string;
    username?: string;
  }): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: getUser.id,
        email: getUser.email,
        username: getUser.username,
      },
    });
  }

  async updateUser(id: string, updateUser: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return await this.userRepository.findOne({ where: { id } });
  }
}
