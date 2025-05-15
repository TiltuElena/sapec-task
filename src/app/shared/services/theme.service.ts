import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme$ = new BehaviorSubject<'dark' | 'light'>(this.getTheme());

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
  }

  setTheme(theme: 'dark' | 'light') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    this.theme$.next(theme);
  }

  getTheme(): 'dark' | 'light' {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }
}
