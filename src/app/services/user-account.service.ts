import { Injectable } from '@angular/core';

import{ MailService } from './user-account/mail.service';
import{ HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  mailService: MailService;
  characterInfo; // TODO: create an object to typecheck??
  characterId: number;// TODO: refactor into characterInfo
  characterName: string; // TODO: refactor into characterInfo

  constructor(characterId, characterName, accessToken, refreshToken, tokenExpirationTime ) {
    this.characterId = characterId;
    this.characterName = characterName;

    this.mailService = new MailService();
    // TODO: httpService should contain the
    // * accessToken don't need!
    // * refreshToken
    // * tokenExpirationTime
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
