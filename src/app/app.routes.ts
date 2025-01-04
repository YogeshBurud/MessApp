import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { AuthGuardService } from './core/helper/auth-guard.service';
import { HomeComponent } from './shared/component/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate : [AuthGuardService] },

    // core routes
    { path: 'login', component:  LoginComponent},
    { path: 'register', component:  RegisterComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
