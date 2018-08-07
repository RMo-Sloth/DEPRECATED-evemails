import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  constructor() { }
  state = 'inactive'
  currentPageName = 'dashboard'
  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}
// TODO: store user data here too (e.g. key to connect to the API )??? No should be stored in a specific class that handles API calls
