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
}
