import {createStore} from 'redux';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import gitHubReducer from './Slice/githubSlice';
const rootReducer = combineReducers({
    github: gitHubReducer,
  });

  const persistConfig: any = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['github'],
  };
const persistedState = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;