import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);
  // Using a proxy or direct call? Adzuna might have CORS issues.
  // Ideally we use a proxy configuration in angular.json or a backend proxy.
  // For this exercise, we'll try direct call first, if it fails we might need a workaround.
  // PROXY: standard angular proxy to avoid CORS if needed.

  private readonly BASE_URL = 'https://www.themuse.com/api/public/jobs';

  searchJobs(keyword: string, location: string, page: number = 1): Observable<{ jobs: Job[], meta: any }> {
    // The Muse API uses 0-based indexing for pages, but our UI uses 1-based.
    const apiPage = page > 0 ? page - 1 : 0;
    let params = new HttpParams().set('page', apiPage.toString());

    // The Muse API Documentation:
    // https://www.themuse.com/developers/api/v2
    // Params: page (int), descending (bool), location (string), category (string), level (string), company (string)

    if (location) {
      params = params.set('location', location);
    }

    // We remove 'category' mapping because it's too strict (must be exact category name).
    // Instead, we will fetch results (filtered by location if provided) and filter by Title/Description client-side.
    // Note: This only searches the current page of results, which is a known limitation of using this specific API without a proxy.
    // But it ensures we don't get empty API responses just because the category name doesn't match perfectly.

    return this.http.get<any>(this.BASE_URL, { params }).pipe(
      map(response => {
        let jobs: Job[] = response.results.map((item: any) => ({
          id: item.id.toString(),
          title: item.name,
          company: item.company.name,
          location: item.locations[0]?.name || 'Remote/Unknown',
          description: this.stripHtml(item.contents), // Strip HTML for clean display
          created: new Date(item.publication_date).toISOString(),
          redirect_url: item.refs.landing_page
        }));

        if (keyword) {
          const lowerK = keyword.toLowerCase();
          jobs = jobs.filter(j =>
            j.title.toLowerCase().includes(lowerK) ||
            j.company.toLowerCase().includes(lowerK)
          );
        }

        return {
          jobs,
          meta: {
            current_page: response.page + 1,
            last_page: response.page_count,
            total: response.total
          }
        };
      })
    );
  }

  getJobDetails(id: string): Observable<Job> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`).pipe(
      map(item => ({
        id: item.id.toString(),
        title: item.name,
        company: item.company.name,
        location: item.locations[0]?.name || 'Remote/Unknown',
        description: this.stripHtml(item.contents),
        created: new Date(item.publication_date).toISOString(),
        redirect_url: item.refs.landing_page
      }))
    );
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '');
  }
}
