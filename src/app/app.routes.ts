import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { noauthGuard } from './core/guards/noauth.guard';

import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { CenteredLayoutComponent } from './layouts/centered-layout/centered-layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'auth',
    component: EmptyLayoutComponent,
    canActivate: [noauthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./modules/auth/sign-in/sign-in.component').then(
            (c) => c.AuthSignInComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./modules/auth/sign-up/sign-up.component').then(
            (c) => c.AuthSignUpComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: CenteredLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'settings/:id',
        loadChildren: () => import('./modules/settings/settings.routes'),
      },
    ],
  },
  {
    path: 'admin',
    component: CenteredLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'courses',
        loadChildren: () => import('./modules/admin/courses/courses.routes'),
      },
      // {
      //     path: 'evaluations',
      //     loadChildren: () =>
      //         import('./modules/admin/evaluations/evaluations.routes'),
      // },
      {
        path: 'surveys',
        loadChildren: () => import('./modules/admin/surveys/surveys.routes'),
      },
      {
        path: 'sites',
        loadChildren: () => import('./modules/admin/sites/sites.routes'),
      },
      {
        path: 'students',
        loadChildren: () => import('./modules/admin/students/students.routes'),
      },
      // {
      //     path: 'users',
      //     loadChildren: () =>
      //         import('./modules/admin/users/users.routes'),
      // },
    ],
  },
  {
    path: 'user',
    component: CenteredLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'courses',
        loadChildren: () => import('./modules/user/courses/courses.routes'),
      },
    ],
  },
  {
    path: '404-not-found',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/error/error-404/error-404.component').then(
        (c) => c.Error404Component
      ),
  },
  { path: '**', redirectTo: '404-not-found' },
];
