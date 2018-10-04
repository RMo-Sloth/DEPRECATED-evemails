import { Injectable } from '@angular/core';

/* INTERFACES */
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  public get_refreshToken( characterIndex ): string{
    let accounts = this.get_accounts();
    let relevantAccount = accounts.find( account => {
      return account.index === characterIndex;
    });
    if( relevantAccount === undefined ){
      console.error('Cannot access a character that is not defined in the local storage.');
    }else{
      return relevantAccount.refreshToken;
    }
  }

  public add_account( newAccount: Account ): void {
    let accounts: Account[] = this.get_accounts();
    let accountAlreadyExists: boolean = accounts.some( account => {
      return account.index === newAccount.index;
    });
    if( accountAlreadyExists === true ) {
      alert('The account you are trying to add already exists! Please remove it and try again.');
    } else {
      accounts.push( newAccount );
      localStorage.setItem( 'accounts', JSON.stringify(accounts) );
    }
  }

  public remove_account( accountIndex: number ): void {
    let accounts: Account[] = this.get_accounts();
    accounts = accounts.filter( account => {
      return account.index !== accountIndex;
    });
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );
  }

  public update_refreshToken( characterIndex, refreshToken ): void {
    let accounts: Account[] = this.get_accounts();
    let relevantAccount: Account = accounts.find( account => {
      return account.index === characterIndex;
    });
    if( relevantAccount === undefined ) {
      console.error('Cannot access a character that is not defined in the local storage.');
    } else {
      relevantAccount.refreshToken = refreshToken;
    }
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );
  }

  public get_accounts(): Account[] {
    const accounts: string = localStorage.getItem('accounts');
    if( accounts === null ) {
      return [];
    } else {
      return JSON.parse( accounts );
    }
  }
}
