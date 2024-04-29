export interface UserData {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  createdAt: number;
  lastLoginAt: number;
  providerData: {
    displayName: string | null;
    phoneNumber: null;
    photoURL: null;
  };
}

export interface UserDetails {
  displayName: null | string;
  email: string;
  emailVerified: boolean;
  isAdmin: boolean;
  isArtisan: boolean;
  isSuperuser: boolean;
  disabled: boolean;
  isVerified: boolean;
  phoneNumber: string | null;
  photoUrl: string | null;
  points: number;
}

export interface AllUsersData {
  id: string;
  displayName: null | string;
  email: string;
  emailVerified: boolean;
  isAdmin: boolean;
  isArtisan: boolean;
  isSuperuser: boolean;
  disabled: boolean;
  isVerified: boolean;
  phoneNumber: string | null;
  photoUrl: string | null;
  points: number;
  createdAt: number;
}
