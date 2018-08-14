import { Mail } from './mail';

export class MailAccount{
  characterId: number;
  refreshToken: string;
  accessToken: string = '';
  tokenExpirationTime; //: Date = '';
  mails: Mail[] = [];
  constructor( characterId: number, refreshToken:string ){
    this.characterId = characterId;

  }
}
