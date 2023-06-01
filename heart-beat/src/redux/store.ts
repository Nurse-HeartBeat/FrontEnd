import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from './user';

const rootReducer = combineReducers({
  user: reducers,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
