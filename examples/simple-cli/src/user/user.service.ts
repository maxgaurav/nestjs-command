import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async add(user: any): Promise<any> {
    console.log('user added:', user);
    return user;
  }
}
