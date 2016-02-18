import {User} from '../users/user';

export interface Rivalry {
  id: number;
  name: string;
  users: User[];
}
