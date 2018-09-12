import { Injectable } from '@angular/core';

import{ UserAccountService } from './services/user-account.service';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  currentPageName: string = '..initialising..';
  constructor() {}
}
