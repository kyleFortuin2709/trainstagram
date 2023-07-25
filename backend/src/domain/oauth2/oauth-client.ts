export type OAuthClient = {
  id: string;
  userId: string;
  clientId: string;
  clientSecret: string;
  callbackUrl: Date;
  grants: "authorization_code" | "refresh_token";
};
