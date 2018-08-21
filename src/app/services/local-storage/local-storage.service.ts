import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get_refreshToken( characterIndex ){

  }
  public add_account( characterIndex, refreshToken ){
    let accounts = this.get_accounts();
    let newAccount = {
      characterId: characterIndex,
      refreshToken: refreshToken
    };
    for( let i=0; i<accounts.length; i++){
      if( accounts[i].characterId === characterIndex ){
        alert('The account you are trying to add already exists! Please remove it and try again.');
        return; // end function execution
      }
    }
    accounts.push( newAccount );
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );

  }
  public remove_account( characterIndex ){
    let accounts = this.get_accounts();
    accounts = accounts.filter( account => {
      return account.characterId !== characterIndex;
    });
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );
  }
  public update_refreshToken( characterIndex, refreshToken){
    let accounts = this.get_accounts();
    // get the character
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
  public get_accounts(): [] { // TODO: typecheck might be nice
    const accounts = localStorage.getItem('accounts');
    if( accounts === undefined ){
      return [];
    }else{
      return JSON.parse( accounts );
    }
  }
}
