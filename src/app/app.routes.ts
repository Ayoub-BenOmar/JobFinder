import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'jobs', loadComponent: () => import('./features/jobs/jobs.component').then(m => m.JobsComponent) }, // Lazy loading as requested
    {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'applications',
        loadComponent: () => import('./features/applications/applications.component').then(m => m.ApplicationsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
];
