import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { RootState } from '../store';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  token: string | null;
  refreshToken: string | null;
  profile: null | UserProfile;
}

const initialState: UserState = {
  token: null,
  refreshToken: null,
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        profile: UserProfile;
      }>
    ) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.profile = action.payload.profile;
    },
    setToken(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
    },
    setRefreshToken(state, action: PayloadAction<{ refreshToken: string }>) {
      state.refreshToken = action.payload.refreshToken;
    },
    setProfile(state, action: PayloadAction<{ profile: UserProfile }>) {
      state.profile = action.payload.profile;
    },
    clearTokens(state) {
      state.refreshToken = null;
      state.token = null;
      state.profile = null;
    },
  },
});

export const {
  clearTokens,
  setCredentials,
  setRefreshToken,
  setToken,
  setProfile,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

const userReducer = userSlice.reducer;
export default userReducer;
