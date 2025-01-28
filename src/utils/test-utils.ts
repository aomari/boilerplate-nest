import { faker } from '@faker-js/faker';
import type { CreateUserDto } from '../admin/dto/create-user.dto';
import { UserRole } from 'src/user/user-role.enum';

export const generateRandomUser = (): CreateUserDto => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    role: UserRole.USER,
  };
};

export const generateRandomAdmin = (): CreateUserDto => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    role: UserRole.ADMIN,
  };
};
