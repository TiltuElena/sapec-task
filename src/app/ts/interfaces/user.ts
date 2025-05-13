import { UserRole, UserStatus } from '../enums';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  creationTime: Date;
  status: UserStatus;
}
