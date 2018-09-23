import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { AccountService } from '../account.service';

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  constructor(
    private accountService: AccountService,
    private localStorageService: LocalStorageService
  ) { }

  public remove_account( accountIndex: number ): void { // TODO: could return boolean on success
      this.accountService.remove_account( accountIndex );
      this.localStorageService.remove_account( accountIndex );
  }
}
