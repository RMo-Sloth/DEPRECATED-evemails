import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { AccountService } from './account.service';
import { MailCounterService } from './mail-counter.service';

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  constructor(
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private mailCounter: MailCounterService
  ) { }

  public remove_account( accountIndex: number ): void {
      this.accountService.remove_account( accountIndex );
      this.localStorageService.remove_account( accountIndex );
      this.mailCounter.remove_unreadMailCounter( accountIndex );
  }
}
