import { Character } from '../character/Character';

export class Account{
  public character: Character;
  public accessToken: string;
  public refreshToken: string;

  public constructor(){}
}
