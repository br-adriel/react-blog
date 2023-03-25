import { UserProfile } from '../types/userSlice';

export function storeUserProfile(profile: UserProfile) {
  const stringProfile = JSON.stringify(profile);
  localStorage.setItem('profile', stringProfile);
}

export function storeRefeshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

export function storeToken(token: string) {
  localStorage.setItem('token', token);
}

export function getStoredRefeshToken() {
  localStorage.getItem('refreshToken');
}

export function getStoredToken() {
  localStorage.getItem('token');
}

export function getStoredUserProfile(): UserProfile | null {
  const stringProfile = localStorage.getItem('profile');
  if (stringProfile) {
    const profile = JSON.parse(stringProfile);
    return profile as UserProfile;
  }
  return null;
}
