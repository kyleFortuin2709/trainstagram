export type OAuthAuthCode = {
  id: string;
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope: string;
  clientId: string;
  userId: string;
};
