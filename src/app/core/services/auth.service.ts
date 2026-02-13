import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map, switchMap, of, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = 'http://localhost:3000/users';
    private readonly STORAGE_KEY = 'jobfinder_user';

    currentUser = signal<User | null>(this.getUserFromStorage());

    constructor() { }

    private getUserFromStorage(): User | null {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    }

    register(user: Omit<User, 'id'>): Observable<User> {
        return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
            switchMap(existingUsers => {
                if (existingUsers.length > 0) {
                    return throwError(() => new Error('Email already exists'));
                }
                return this.http.post<User>(this.apiUrl, user);
            }),
            tap(createdUser => {
                this.setSession(createdUser);
            })
        );
    }

    login(credentials: { email: string; password: string }): Observable<User> {
        return this.http.get<User[]>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`).pipe(
            map(users => {
                if (users.length === 0) {
                    throw new Error('Invalid email or password');
                }
                return users[0];
            }),
            tap(user => {
                this.setSession(user);
            })
        );
    }

    private setSession(user: User): void {
        const safeUser = { ...user };
        delete safeUser.password;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(safeUser));
        this.currentUser.set(safeUser);
    }

    logout(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!this.currentUser();
    }

    updateUser(user: Partial<User> & { id: string }): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/${user.id}`, user).pipe(
            tap(updatedUser => {
                this.setSession(updatedUser);
            })
        );
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.logout())
        );
    }
}
