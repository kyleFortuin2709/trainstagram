export type OAuthRefreshToken = {
  id: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  scope: string;
  clientId: string;
  userId: string;
};
