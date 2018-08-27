import { Injectable } from '@angular/core';

import { UserAccountService } from '../user-account.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    userAccountService: UserAccountService,
    localStorageService: LocalStorageService
  ) { }

  public signup_account( accessToken ){
    
  }
  private get_accountInfo(){
    // http-request using the accessToken
  }
  private register_account( characterId, accessToken, refreshToken ){
    this.userAccountService.add_account( characterIndex ); // TODO: should add accessToken too.
    this.localStorageService.add_account( characterIndex, accessToken, refreshToken ); // TODO: add expiration time of accessToken too
  }

}
