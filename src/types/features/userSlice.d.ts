export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  isAuthor: boolean;
  isAdmin: boolean;
}

export interface UserState {
  profile: null | UserProfile;
}
