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
        alert('The account you are trying to add already exists! Please remove it before trying to recreate it.');
        return; // end function execution
      }
    }
    accounts.push( newAccount );
    localStorage.setItem( 'accounts', JSON.stringify(accounts) );

  }
  public remove_account(){

  }
  public update_account(){

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
