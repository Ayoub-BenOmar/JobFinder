import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../../core/services/favorites.service';
import { selectAllFavorites, selectFavoritesLoading } from '../../store/favorites/favorites.selectors';
import { FavoritesActions } from '../../store/favorites/favorites.actions';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    private store = inject(Store);
    private authService = inject(AuthService);

    favorites$: Observable<Favorite[]> = this.store.select(selectAllFavorites);
    isLoading$ = this.store.select(selectFavoritesLoading);

    ngOnInit() {
        // Reload favorites to be sure? Or rely on store state.
        // If we navigated here, data might be stale if we rely only on init.
        // But we dispatched load in JobList.
        const user = this.authService.currentUser();
        if (user) {
            // We can dispatch again or just rely on selector. 
            // Dispatching ensures freshness.
            this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
        }
    }

    removeFavorite(id: string) {
        if (confirm('Are you sure you want to remove this favorite?')) {
            this.store.dispatch(FavoritesActions.removeFavorite({ id }));
        }
    }
}
