import { Injectable } from '@angular/core';

import{ MailService } from '../mail.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  mailService: MailService;
  accessToken: string;
  refreshToken: string;
  expirationTime: Date;
  characterId: number;
  constructor() {
    this.mailService = new MailService();
    // I also need to define a:
    // * access token
    // * refresh token
    // * token expiration time ( will need to check this every minute through the app-state? And refresh when necessary. The appstate will set the frequency and UserAccountService will figure out when to update )
    // * characterId
    // * characterImageUrls
    // * characterName
  }
  get_characterIndex():number{
    return this.characterId;
  }
}
// TODO: refactor mailservice into service folder, should only be called through the useraccountservice
// // TODO: UserAccountsServices are stored inside the AppStateService-singleton
