import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/* INTERFACES */
import { Account } from '../interfaces/account';

/* SERVICES */
import { AccountTokenService } from './account-token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[];
  accounts$: BehaviorSubject<Account[]>;

  constructor(
    private accountToken: AccountTokenService,
  ) {
    this.accounts = [];
    this.accounts$ = new BehaviorSubject([]);

    // TODO: should only run after obtaining new tokens
    if( localStorage.getItem('accounts') !== null )
    {
      let accounts = JSON.parse( localStorage.getItem('accounts') );
      accounts.forEach( account => {
          this.add_account( account );
      });
    }
  }

  public add_account( account: Account ): void {
    switch ( account.authenticationFlow ) {
      case 'implicit':
        this.accounts$.next( this.accounts );
        /*duplicated check*/
        if( this.isRegisteredAccount( account.index ) === false ) {
          this.accounts.push( account );
        } else {
          console.error("The account you are trying to add already exist");
        }
        // TODO: Should notify user when token is expired
        break;
      case 'explicit':
        this.accountToken.update_accessToken( account.refreshToken )
        .subscribe(accessToken => {
          account.accessToken = accessToken;
          this.accounts$.next( this.accounts );
        });
        this.accountToken.initiate_tokenUpdater( account.refreshToken, account.index )
        .subscribe( accessToken => {
          account.accessToken = accessToken;
          /*duplicated check*/
          if( this.isRegisteredAccount( account.index ) === false ) {
            this.accounts.push( account );
          } else {
            console.error("The account you are trying to add already exist");
          }
          this.accounts$.next( this.accounts );
        });
        break;
    }
  }

  public remove_account( accountIndex: number ): void {
    this.accounts = this.accounts.filter( account => {
      return account.index !== accountIndex;
    });
    this.accounts$.next( this.accounts );
    this.accountToken.end_tokenUpdater( accountIndex );
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
