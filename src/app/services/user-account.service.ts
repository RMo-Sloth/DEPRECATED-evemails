import { Injectable } from '@angular/core';

import{ MailService } from './user-account/mail.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  mailService: MailService;
  accessToken: string;
  refreshToken: string;
  tokenExpirationTime: Date;
  characterId: number;
  characterName: string;

  constructor( characterId, characterName, accessToken, refreshToken, tokenExpirationTime ) {
    this.characterId = characterId;
    this.characterName = characterName;
    
    this.mailService = new MailService();
    // TODO: all the below:
    // after reirect of teh account verification we will get a:
    // * access token
    // * refresh token
    // * token expiration time ( will need to check this every minute through the app-state? And refresh when necessary. The appstate will set the frequency and UserAccountService will figure out when to update )
    // * With this info we can verify through our own server and get the characterId
    // * characterId
    // characterId, and refresh token should be stored in a cookie
    // With the token and characterId we can gather all kinds of information
    // * characterImageUrls
    // * characterName
  }
  get_mailService(): MailService{
    return this.mailService;
  }
}
