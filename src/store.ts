import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './features/commentsSlice';
import postManagementReducer from './features/postManagementSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentsReducer,
    postManagement: postManagementReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
