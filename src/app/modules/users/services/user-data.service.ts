import { Injectable } from '@angular/core';
import { User } from '@/shared/interfaces';
import { UserRole, UserStatus } from '@/shared/enums';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private readonly http: HttpClient) {}

  data: User[] = [
    {
      id: 0,
      fullName: 'user 1',
      email: 'user1@gmail.com',
      role: UserRole.USER,
      creationTime: new Date('2025-05-09'),
      status: UserStatus.ACTIVE,
    },
    {
      id: 1,
      fullName: 'admin 1',
      email: 'admin1@gmail.com',
      role: UserRole.ADMIN,
      creationTime: new Date('2025-05-10'),
      status: UserStatus.ACTIVE,
    },
    {
      id: 2,
      fullName: 'user 2',
      email: 'user2@gmail.com',
      role: UserRole.USER,
      creationTime: new Date('2025-05-09'),
      status: UserStatus.INACTIVE,
    },
    {
      id: 3,
      fullName: 'user 3',
      email: 'user3@gmail.com',
      role: UserRole.USER,
      creationTime: new Date('2025-05-11'),
      status: UserStatus.ACTIVE,
    },
    {
      id: 4,
      fullName: 'admin 2',
      email: 'admin2@gmail.com',
      role: UserRole.ADMIN,
      creationTime: new Date('2025-05-12'),
      status: UserStatus.ACTIVE,
    },
    {
      id: 5,
      fullName: 'user 5',
      email: 'user5@gmail.com',
      role: UserRole.USER,
      creationTime: new Date('2025-05-12'),
      status: UserStatus.INACTIVE,
    },
    {
      id: 6,
      fullName: 'admin 3',
      email: 'admin3@gmail.com',
      role: UserRole.ADMIN,
      creationTime: new Date('2025-05-09'),
      status: UserStatus.INACTIVE,
    },
  ];

  userData$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.data);

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
  }
}
