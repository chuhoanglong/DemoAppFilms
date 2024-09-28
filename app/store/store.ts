import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {reduxStorage} from './storage';

// Slices
import filmsSlice from './filmsSlice';

import {TypedUseSelectorHook, useSelector} from 'react-redux';

const rootReducer = combineReducers({
  films: filmsSlice,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: ['films'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
