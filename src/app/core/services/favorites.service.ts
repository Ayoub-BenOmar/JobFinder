import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

export interface Favorite {
    id?: string;
    userId: string;
    offerId: string;
    title: string;
    company: string;
    location: string;
    // stored locally to display even if API changes
    jobDetails?: Job;
}

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/favorites';

    getFavorites(userId: string): Observable<Favorite[]> {
        return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}`);
    }

    addFavorite(favorite: Omit<Favorite, 'id'>): Observable<Favorite> {
        // Check if already exists? Server logic usually, but json-server is dumb.
        // We'll rely on Effects to check or just post.
        // Ideally we check before adding in the Component/Effect.
        return this.http.post<Favorite>(this.apiUrl, favorite);
    }

    removeFavorite(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Helper to check if a job is favorited (could be done in store)
}
