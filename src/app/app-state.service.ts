import { Injectable } from '@angular/core';

import{ UserAccountService } from './services/user-account.service';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  state: string = 'inactive'; // TODO: Should maybe refactor to boolean value since it is only a check if the app is active
  currentPageName: string = '..initialising..';
  constructor() {}
  // state
  toggleState(): void {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
  // get_account( characterIndex: number ){
  //   for( let i=0; this.accounts.length > i; i++ ){
  //     if( this.accounts[i].characterId  === characterIndex ){
  //       return this.accounts[i];
  //     }
  //     // TODO: handle behaviour when character is not found
  //     // TEMP: alert
  //   }
  //   alert('Account can not be found!');
  // }
}
