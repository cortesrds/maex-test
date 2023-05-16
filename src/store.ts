import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import maexReducer from './features/maex/maexSlice';
import { maexApi } from './services/maex';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(maexApi.middleware),
  reducer: {
    maex: maexReducer,
    [maexApi.reducerPath]: maexApi.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
