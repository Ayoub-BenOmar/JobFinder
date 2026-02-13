import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoritesActions } from './favorites.actions';

@Injectable()
export class FavoritesEffects {
    private actions$ = inject(Actions);
    private favoritesService = inject(FavoritesService);

    loadFavorites$ = createEffect(() => this.actions$.pipe(
        ofType(FavoritesActions.loadFavorites),
        switchMap(({ userId }) => this.favoritesService.getFavorites(userId).pipe(
            map(favorites => FavoritesActions.loadFavoritesSuccess({ favorites })),
            catchError(error => of(FavoritesActions.loadFavoritesFailure({ error })))
        ))
    ));

    addFavorite$ = createEffect(() => this.actions$.pipe(
        ofType(FavoritesActions.addFavorite),
        mergeMap(({ favorite }) => this.favoritesService.addFavorite(favorite).pipe(
            map(newFavorite => FavoritesActions.addFavoriteSuccess({ favorite: newFavorite })),
            catchError(error => of(FavoritesActions.addFavoriteFailure({ error })))
        ))
    ));

    removeFavorite$ = createEffect(() => this.actions$.pipe(
        ofType(FavoritesActions.removeFavorite),
        mergeMap(({ id }) => this.favoritesService.removeFavorite(id).pipe(
            map(() => FavoritesActions.removeFavoriteSuccess({ id })),
            catchError(error => of(FavoritesActions.removeFavoriteFailure({ error })))
        ))
    ));
}
