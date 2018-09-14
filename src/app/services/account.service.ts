import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Account } from '../interfaces/account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  public add_account(
    index: number,
    accessToken: string,
    refreshToken: string
  ): Observable<Account>{
    return new Observable( observer => {
      if( this.isRegisteredAccount( index ) === false ){
        const account: Account = {
          index: index,
          accessToken: accessToken,
          refreshToken: refreshToken,
          }
          observer.next( account );
          observer.complete();
      }else{
        observer.error("The account you are trying to add already exist");
      }
    }); // end observable
  }
  public get_account( index: number ): Observable<Account>{
    return new Observable( observer => {
      if( this.isRegisteredAccount( index ) === true ){
        let account = this.accounts.find( account => {
          return account.index === index;
        });
        observer.next( account );
        observer.complete();
      }else{
        // TODO: alert user account isn't registered maybe refer to authentication page?
        observer.error("The user account you are trying to use isn't registed on this device.");
      }
  }); // end observable
  }
  private isRegisteredAccount( index: number ): boolean{
    return this.accounts.some( account => {
      return account.index === index;
    });
  }

}
