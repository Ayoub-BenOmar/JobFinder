import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Favorite } from '../../core/services/favorites.service';

export const FavoritesActions = createActionGroup({
    source: 'Favorites',
    events: {
        'Load Favorites': props<{ userId: string }>(),
        'Load Favorites Success': props<{ favorites: Favorite[] }>(),
        'Load Favorites Failure': props<{ error: any }>(),

        'Add Favorite': props<{ favorite: Omit<Favorite, 'id'> }>(),
        'Add Favorite Success': props<{ favorite: Favorite }>(),
        'Add Favorite Failure': props<{ error: any }>(),

        'Remove Favorite': props<{ id: string }>(),
        'Remove Favorite Success': props<{ id: string }>(),
        'Remove Favorite Failure': props<{ error: any }>(),
    }
});
