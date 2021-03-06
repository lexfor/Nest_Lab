import { User } from '../entities/user.enity';

export interface AuthRepository {
  createUser: (user: User) => Promise<User>;
  getUser: (login: string, role: string) => Promise<User>;
}
