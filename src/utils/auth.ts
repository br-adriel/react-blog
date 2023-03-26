import axios from 'axios';
import { clearTokens, setToken } from '../features/userSlice';
import store from '../store';
import { UserProfile } from '../types/userSlice';

export function storeUserProfile(profile: UserProfile) {
  const stringProfile = JSON.stringify(profile);
  localStorage.setItem('profile', stringProfile);
}

export function storeRefreshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

export function storeToken(token: string) {
  localStorage.setItem('token', token);
}

export function getStoredRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function getStoredToken() {
  return localStorage.getItem('token');
}

export function getStoredUserProfile(): UserProfile | null {
  const stringProfile = localStorage.getItem('profile');
  if (stringProfile) {
    const profile = JSON.parse(stringProfile);
    return profile as UserProfile;
  }
  return null;
}

export function clearStoredUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('profile');
}

export function refreshToken() {
  const REFRESH_TOKEN = getStoredRefreshToken();
  if (REFRESH_TOKEN) {
    axios
      .post<{ token: string }>(
        import.meta.env.VITE_API_URL + '/users/authenticate/refresh',
        {
          headers: {
            Authorization: 'Bearer ' + REFRESH_TOKEN,
          },
        }
      )
      .then(async (res) => {
        storeToken(res.data.token);
        store.dispatch(setToken({ token: res.data.token }));
        return res;
      })
      .catch((err) => {
        clearStoredUser();
        store.dispatch(clearTokens());
        return err;
      });
  } else {
    clearStoredUser();
    store.dispatch(clearTokens());
  }
}
