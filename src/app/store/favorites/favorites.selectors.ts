import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState, adapter } from './favorites.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllFavorites = createSelector(
    selectFavoritesState,
    selectAll
);

export const selectFavoritesEntities = createSelector(
    selectFavoritesState,
    selectEntities
);

export const selectIsFavorite = (offerId: string) => createSelector(
    selectAllFavorites,
    (favorites) => favorites.some(f => f.offerId === offerId)
);

export const selectFavoritesLoading = createSelector(
    selectFavoritesState,
    (state) => state.loading
);
