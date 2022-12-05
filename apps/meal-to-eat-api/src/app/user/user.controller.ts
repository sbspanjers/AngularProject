import { User } from '@MealToEat/data';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Put(':id')
  async editOne(@Body() body: User): Promise<string> {
    return this.userService.editOne(body.id, body)
  }
}