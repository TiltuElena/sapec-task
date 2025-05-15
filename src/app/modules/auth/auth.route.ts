import { Route } from "@angular/router";

export const authRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.route').then(m => m.loginRoute)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.route').then(m => m.registerRoute)
  },
]
