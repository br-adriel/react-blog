import { clearProfile } from '../features/userSlice';
import { api } from '../lib/axios';
import store from '../store';
import { UserProfile } from '../types/features/userSlice';

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

export async function logout() {
  await api.post('/users/authenticate/logout');
  store.dispatch(clearProfile());
  clearStoredUser();
}
