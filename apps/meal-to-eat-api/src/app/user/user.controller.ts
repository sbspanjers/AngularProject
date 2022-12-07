import { User } from '@MealToEat/data';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { InjectToken, Token } from '../auth/token.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('loggedUser')
  async getLoggedInUser(@InjectToken() token: Token): Promise<User> {
    console.log('ik ben hier');
    return this.userService.getOne(token.id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Put(':id')
  async editOne(@Param('id') id: string, @Body() updatedUser: User): Promise<string> {   
    return await this.userService.editOne(updatedUser.id, updatedUser);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<string> {
    const userToDelete = await this.getOne(id)
    return await this.userService.deleteOne(userToDelete);
  }
}