export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserState {
  token: string | null;
  refreshToken: string | null;
  profile: null | UserProfile;
}
