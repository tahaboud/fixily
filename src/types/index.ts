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
}
