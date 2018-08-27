export class UserTokens {
  public accessToken: string;
  public refreshToken: string;
  public expired: number;

  public constructor(){}
}


// TODO: maybe connect this with a service that refreshes the tokens based on the exprartionTime
