import { Injectable } from '@angular/core';

import { Account } from '../../classes/account/Account';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserAccountService } from '../user-account.service';

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  constructor(
    private userAccountService: UserAccountService,
    private localStorageService: LocalStorageService
  ) { }

  public remove_account( account: Account ): void { // TODO: could return boolean on success
      this.userAccountService.remove_account( account.character.characterId );
      this.localStorageService.remove_account( account.character.characterId );
  }
}