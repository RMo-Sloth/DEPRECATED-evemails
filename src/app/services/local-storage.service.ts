import { Injectable } from '@angular/core';

/* INTERFACES */
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get_refreshToken( characterIndex ): string{
    let accounts:any = this.get_accounts();
    let relevantAccount = accounts.find( account => {
      return account.characterId === characterIndex;
    });
    if( relevantAccount === undefined ){
      console.error('Cannot access a character that is not defined in the local storage.');
    }else{
      return relevantAccount.refreshToken;
    }
  }

  public add_account( account: Account ): void{
    let accounts: any = this.get_accounts();
    // can refactor the for-loop to be executed before th e if statement
    for( let i=0; i<accounts.length; i++){
      if( accounts[i].index === account.index ){
        alert('The account you are trying to add already exists! Please remove it and try again.');
        return; // end function execution
      }
    }
    accounts.push( account );
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );
  }

  public remove_account( accountIndex: number ): void{
    let accounts: any = this.get_accounts();
    accounts = accounts.filter( account => {
      return account.index !== accountIndex;
    });
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );
  }

  public update_refreshToken( characterIndex, refreshToken): void{
    let accounts:any = this.get_accounts();
    let relevantAccount = accounts.find( account => {
      return account.characterId === characterIndex;
    });
    if( relevantAccount === undefined ){
      console.error('Cannot access a character that is not defined in the local storage.');
    }else{
      relevantAccount.refreshToken = refreshToken;
    }
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );
  }

  public get_accounts(): any { // TODO: typecheck might be nice
    const accounts:any = localStorage.getItem('accounts');
    if( accounts === null ){
      return [];
    }else{
      return JSON.parse( accounts );
    }
  }
}

// TODO: implement more strict type-checking
