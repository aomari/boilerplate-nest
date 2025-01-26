import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { PaginationDto } from './dto/pagination.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from './user-role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { DtoValidationPipe } from 'src/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users with pagination (Admin only)' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number' })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 30,
    description: 'Number of users per page',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users retrieved successfully.' })
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Preferred language for the API response (options: en, ar)',
    required: false,
    schema: {
      type: 'string',
      default: 'en',
    },
  })
  async getAllUsers(@Query(DtoValidationPipe) query: PaginationDto) {
    console.log('Parsed Query:', query);
    return this.userService.getAllUsers(query);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully.' })
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Preferred language for the API response (options: en, ar)',
    required: false,
    schema: {
      type: 'string',
      default: 'en',
    },
  })
  async createUser(@Body() createUserDto: CreateUserDto, @I18n() i18n: I18nContext) {
    const user = await this.userService.createUserByAdmin(createUserDto);
    return {
      message: await i18n.t('common.user.createdSuccessfully'),
      user,
    };
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an existing user (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated successfully.' })
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Preferred language for the API response (options: en, ar)',
    required: false,
    schema: {
      type: 'string',
      default: 'en',
    },
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @I18n() i18n: I18nContext,
  ) {
    const user = await this.userService.updateUserByAdmin(id, updateUserDto);
    return {
      message: await i18n.t('common.user.updatedSuccessfully'),
      user,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an existing user (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted successfully.' })
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Preferred language for the API response (options: en, ar)',
    required: false,
    schema: {
      type: 'string',
      default: 'en',
    },
  })
  async deleteUser(@Param('id') id: string, @I18n() i18n: I18nContext) {
    await this.userService.deleteUser(id);
    return {
      message: await i18n.t('common.user.deletedSuccessfully'),
    };
  }
}
