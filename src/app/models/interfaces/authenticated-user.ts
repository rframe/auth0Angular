export interface AuthenticatedUser {
  isAuthenticated: boolean;
  emailAddress: string;
  emailAddressVerified: boolean;
  expiresAt: number;
}
