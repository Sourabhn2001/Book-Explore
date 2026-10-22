import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/loginSlice';
import favoriteReducer from "./slice/favorateSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    favorites: favoriteReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch