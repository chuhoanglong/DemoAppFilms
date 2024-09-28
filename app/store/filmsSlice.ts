import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Film} from 'app/types/stores';
import {films} from 'app/utils/constants';

export interface InitialState {
  films: Film[];
  filmsFavorites: Film[];
  filmsWatched: Film[];

  loadmore: boolean;
}

const NUMBER_OF_ITEMS = 10;

const initialState: InitialState = {
  films: films.slice(0, NUMBER_OF_ITEMS),
  filmsFavorites: [],
  filmsWatched: [],
  loadmore: true,
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    getDataFilms: (state, action: PayloadAction<{page: number}>) => {
      // check if there are more films to load else set loadmore to false to stop loading
      if (
        state.loadmore &&
        action.payload.page * NUMBER_OF_ITEMS < films.length
      ) {
        state.films = films
          .slice(0, action.payload.page * NUMBER_OF_ITEMS)
          .map(film => ({
            ...film,
            like:
              state.filmsFavorites.find(f => f.id === film.id)?.like ?? false,
            watch:
              state.filmsWatched.find(f => f.id === film.id)?.watch ?? false,
          }));
        return;
      }
      state.loadmore = false;
    },

    searchFilms: (state, action: PayloadAction<{search: string}>) => {
      state.films = films
        .filter(film =>
          film.title
            .toLowerCase()
            .includes(action.payload.search.toLowerCase()),
        )
        .map(film => ({
          ...film,
          like: state.filmsFavorites.find(f => f.id === film.id)?.like ?? false,
          watch: state.filmsWatched.find(f => f.id === film.id)?.watch ?? false,
        }));
    },

    filmFavoritesAction: (state, action) => {
      // check if film is already in favorites
      if (state.filmsFavorites.find(film => film.id === action.payload.id)) {
        // remove film from favorites
        state.filmsFavorites = state.filmsFavorites.filter(
          film => film.id !== action.payload.id,
        );
        // update status like of film
        state.films = state.films.map(film =>
          film.id === action.payload.id ? {...film, like: false} : film,
        );
        // update status like of film watched
        state.filmsWatched = state.filmsWatched.map(film =>
          film.id === action.payload.id ? {...film, like: false} : film,
        );

        return;
      }
      // add film to favorites
      state.filmsFavorites.push({...action.payload, like: true});
      // update status like of film
      state.films = state.films.map(film =>
        film.id === action.payload.id ? {...film, like: true} : film,
      );
      // update status like of film watched
      state.filmsWatched = state.filmsWatched.map(film =>
        film.id === action.payload.id ? {...film, like: true} : film,
      );
    },
    filmsWatchedAction: (state, action) => {
      // check if film is already in favorites
      if (state.filmsWatched.find(film => film.id === action.payload.id)) {
        // remove film from favorites
        state.filmsWatched = state.filmsWatched.filter(
          film => film.id !== action.payload.id,
        );
        // update status watch of film
        state.films = state.films.map(film =>
          film.id === action.payload.id ? {...film, watch: false} : film,
        );
        // update status watch of film favorites
        state.filmsFavorites = state.filmsFavorites.map(film =>
          film.id === action.payload.id ? {...film, watch: false} : film,
        );
        return;
      }
      // add film to favorites
      state.filmsWatched.push({...action.payload, watch: true});
      // update status watch of film
      state.films = state.films.map(film =>
        film.id === action.payload.id ? {...film, watch: true} : film,
      );
      // update status watch of film favorites
      state.filmsFavorites = state.filmsFavorites.map(film =>
        film.id === action.payload.id ? {...film, watch: true} : film,
      );
    },
  },
});

export const FilmsActions = filmsSlice.actions;

export default filmsSlice.reducer;
