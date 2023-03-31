import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { RootState } from '../store';
import { UserProfile, UserState } from '../types/features/userSlice';

const initialState: UserState = {
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<{ profile: UserProfile }>) {
      state.profile = action.payload.profile;
    },
    clearProfile(state) {
      state.profile = null;
    },
  },
});

export const { clearProfile, setProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

const userReducer = userSlice.reducer;
export default userReducer;
