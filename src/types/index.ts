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
  isSuperadmin: boolean;
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
  is_admin: boolean;
  is_artisan: boolean;
  is_superadmin: boolean;
  is_verified: boolean;
  phoneNumber: string | null;
  photoUrl: string | null;
  points: number;
  createdAt: string;
}
