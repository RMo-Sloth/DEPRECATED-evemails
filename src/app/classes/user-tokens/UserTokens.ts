export class UserTokens {
  public accessToken: string;
  public refreshToken: string;
  public expirationTime: string;

  public constructor(){}
}


// TODO: maybe connect this with a service that refreshes the tokens based on the exprartionTime
