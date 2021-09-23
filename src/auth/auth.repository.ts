import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';

@Injectable()
export class SQLRepository {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async createUser(user: User): Promise<User> {
    const sql = `INSERT INTO users SET ?`;
    await this.databaseService.executeQuery(sql, [user]);
    return user;
  }

  async getUser(login: string, role: string): Promise<User> {
    let join = '';
    if (role === 'doctor') {
      join = `
        JOIN doctors ON 
        doctors.user_id = users.id`;
    }
    const sql = `SELECT users.* FROM users
        ${join}
        WHERE 
        login = ?`;
    const result = await this.databaseService.executeQuery(sql, [login]);
    return result[0];
  }
}
