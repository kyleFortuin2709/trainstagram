export type OAuthAccessToken = {
  id: string;
  accessToken: string;
  accessTokenExpiresAt: Date;
  scope: string;
  clientId: string;
  userId: string;
};
