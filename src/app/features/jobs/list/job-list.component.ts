import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../core/models/job.model';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.service';
import { FavoritesActions } from '../../../store/favorites/favorites.actions';
import { selectAllFavorites } from '../../../store/favorites/favorites.selectors';
import { map } from 'rxjs';
import { ApplicationService } from '../../../core/services/application.service';

@Component({
    selector: 'app-job-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
    @Input() jobs: Job[] = [];
    @Input() isLoading = false;

    private store = inject(Store);
    authService = inject(AuthService);
    private applicationService = inject(ApplicationService);

    favorites$ = this.store.select(selectAllFavorites);

    ngOnInit() {
        const user = this.authService.currentUser();
        if (user) {
            this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
        }
    }

    isFavorite(jobId: string) {
        return this.favorites$.pipe(map(favorites => favorites.some(f => f.offerId === jobId)));
    }

    toggleFavorite(job: Job) {
        const user = this.authService.currentUser();
        if (!user) {
            alert('Please login to add favorites');
            return;
        }

        // Check if already favorite to toggle (remove) or add
        // Ideally we have the ID of the favorite record to remove it.
        // This is tricky because we need to find the favorite record ID first.
        // For now, let's just implement ADD and maybe REMOVE if we can find it.

        // We can subscribe once to check
        this.favorites$.pipe(map(favorites => favorites.find(f => f.offerId === job.id))).subscribe(existing => { // Simple subscription for action, beware of leaks or repeated emissions if not taken 1
            // actually using subscribe in an event handler is ok if it completes or we take 1, but select returns a stream.
            // Better to use structured logic.
        }).unsubscribe();

        // Simpler approach for this step: Just implement Add logic and we'll refine Remove logic next
        // Or dispatch an action "Toggle Favorite" and let Effect handle it? 
        // Effect would need to query store. 

        // Let's explicitly look up in the component for now.
        // But `favorites$` is an observable.
        // I already have `selectAllFavorites`. 
    }

    addToFavorite(job: Job) {
        const user = this.authService.currentUser();
        if (!user) return;
        this.store.dispatch(FavoritesActions.addFavorite({
            favorite: {
                userId: user.id,
                offerId: job.id,
                title: job.title,
                company: job.company,
                location: job.location,
                jobDetails: job
            }
        }));
    }

    trackApplication(job: Job) {
        const user = this.authService.currentUser();
        if (!user) {
            alert('Please login to track applications');
            return;
        }

        // Create new application object
        const app: any = { // Using any cast to avoid importing Application interface here just for payload
            userId: user.id,
            offerId: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            url: job.redirect_url,
            status: 'en_attente',
            notes: '',
            dateAdded: new Date().toISOString()
        };

        this.applicationService.addApplication(app).subscribe({
            next: () => alert('Application tracked successfully!'),
            error: (err) => console.error('Failed to track application', err)
        });
    }

    // Future: Add pagination inputs
}
