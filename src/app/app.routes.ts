import { SignUpComponent } from './pages/login/sign-up/sign-up.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
    ]
  },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
