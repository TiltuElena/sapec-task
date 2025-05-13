import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PageRoutes } from '@/ts/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  getUserRole() {
    return localStorage.getItem('userRole');
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  login(email: string, password: string): boolean {
    if (email === 'user@gmail.com' && password === 'user') {
      localStorage.setItem('token', 'token');
      localStorage.setItem('userRole', 'user');
      this.router.navigate([PageRoutes.HOME]);
    } else if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('token', 'token');
      localStorage.setItem('userRole', 'admin');
      this.router.navigate([PageRoutes.USERS]);
    } else {
      return false;
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    this.router.navigate([PageRoutes.LOGIN]);
  }
}
