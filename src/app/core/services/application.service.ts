import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ApplicationStatus = 'en_attente' | 'accepte' | 'refuse';

export interface Application {
    id?: string;
    userId: string;
    offerId: string;
    title: string;
    company: string;
    location: string;
    url: string;
    status: ApplicationStatus;
    notes: string;
    dateAdded: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/applications';

    getApplications(userId: string): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.apiUrl}?userId=${userId}`);
    }

    addApplication(app: Omit<Application, 'id'>): Observable<Application> {
        return this.http.post<Application>(this.apiUrl, app);
    }

    updateApplication(app: Application): Observable<Application> {
        return this.http.put<Application>(`${this.apiUrl}/${app.id}`, app);
    }

    deleteApplication(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
