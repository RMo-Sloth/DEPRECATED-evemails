import { Injectable } from '@angular/core';

import{ UserAccountService } from './services/user-account.service';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  state: string;
  currentPageName: string;
  accounts: UserAccountService[];
  currentAccount: UserAccountService;
  constructor() {
    this.state = 'inactive';
    this.currentPageName = 'dashboard';
    this.accounts = [];
    // TEMP: temporary assignemnet of a UserAccountService
    this.add_account( new UserAccountService() );
  }
  // state
  toggleState(): void {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
  // pageName
  set_currentPagename( pageName: string ): void{
    this.currentPageName = pageName;
  }
  // accounts
  add_account( userAccountService: UserAccountService): void{
    // TODO:  prevent dupication of the same character, check character_id
    // foreach useraccountservice cannot have equal id
    this.accounts.push( userAccountService );
  }
  get_account( characterIndex: number ){
    for( let i=0; this.accounts.length > i; i++ ){
      if( this.accounts[i].get_characterIndex()  === characterIndex ){
        return this.accounts[i];
      }
      // TODO: handle behaviour when character is not found
      // TEMP: alert
      alert('This account already exists!');
    };
  }
  setCurrentAccount( account: UserAccountService){
    this.currentAccount = account;
  }
}
