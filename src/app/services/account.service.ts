import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/* INTERFACES */
import { Account } from '../interfaces/account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[];
  accounts$: BehaviorSubject<Account[]>;

  constructor() {
    this.accounts = [];
    this.accounts$ = new BehaviorSubject([]);

    if( localStorage.getItem('accounts') !== null )
    {
      let accounts = JSON.parse( localStorage.getItem('accounts') );
      accounts.forEach( account => {
        this.add_account( account );
      });
    }
  }

  public add_account( account: Account ): void {
    if( this.isRegisteredAccount( account.index ) === false ){
      this.accounts.push( account );
      this.accounts$.next( this.accounts );
    }else{
      console.error("The account you are trying to add already exist");
    }
  }

  public get_account( index: number ): Observable<Account> {
    return new Observable( observer => {
      if( this.isRegisteredAccount( index ) === true ){
        let account = this.accounts.find( account => {
          return account.index === index;
        });
        observer.next( account );
        observer.complete();
      } else {
        // TODO: alert user account isn't registered maybe refer to authentication page?
        observer.error("The user account you are trying to use isn't registed on this device.");
      }
    }); // end observable
  }

  public remove_account( accountIndex: number ): void {
    this.accounts = this.accounts.filter( account => {
      return account.index !== accountIndex;
    });
    this.accounts$.next( this.accounts );
  }

  private isRegisteredAccount( index: number ): boolean {
    return this.accounts.some( account => {
      return account.index === index;
    });
  }

  public update_accessToken( accessToken: string, accountIndex: number ): void {
    this.get_account( accountIndex )
    .subscribe( account => {
      account.accessToken = accessToken;
    });
  }
}
