import { User } from '@MealToEat/data';
import { Injectable } from '@nestjs/common';
import { UserDocument, User as UserModel } from './user.schema';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { filter } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    console.log('API: get all users aangeroepen!');

    return this.userModel.find();
  }

  async getOne(userId: string): Promise<User> {
    console.log('API: get one user (id: '+ userId + ') aangeroepen!');
    const users = await this.userModel.aggregate([{ $match: { id: userId }}]);        
    return users[0];
  }

  async editOne(userId: string, newData: User): Promise<string> {
    console.log('API: update one user (id: ' + userId + ') aangeroepen!');
    let output;
    try {
      output = await this.userModel.updateOne({ "id": userId }, { $set: { "name": newData.name, "emailAddress": newData.emailAddress }})
    } catch (error) {
      console.log(error);
    }
    
    return output;
  }
}