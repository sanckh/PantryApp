import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {
  configureStore as RTKConfigureStore,
} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import persistConfig from './persistConfig';

import {appReducer} from './slices/app-slice';

const rootReducer = combineReducers({
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

export const store = RTKConfigureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export const persistor = persistStore(store);
