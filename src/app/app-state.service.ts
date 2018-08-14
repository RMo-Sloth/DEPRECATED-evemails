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
    this.accounts = [];

    if( localStorage.getItem('accounts') !== null )
    {
      let accounts = JSON.parse( localStorage.getItem('accounts') );
      accounts.forEach( account => {
        this.add_account(
          new UserAccountService(
            account.characterId,
            account.characterName,
            'accessToken',
            'refreshToken',
            'tokenExpirationTime'
          )
        );
      });
    }
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
      if( this.accounts[i].characterId  === characterIndex ){
        return this.accounts[i];
      }
      // TODO: handle behaviour when character is not found
      // TEMP: alert
    }
    alert('Account can not be found!');
  }
  set_currentAccount( account: UserAccountService){
    this.currentAccount = account;
  }
  unset_currentAccount():void{
    this.currentAccount = undefined;
  }
}
