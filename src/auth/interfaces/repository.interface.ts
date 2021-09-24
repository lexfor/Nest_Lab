import { User } from './user.interface';

export interface AuthRepository {
  createUser: (user: User) => Promise<User>;
  getUser: (login: string, role: string) => Promise<User>;
}
