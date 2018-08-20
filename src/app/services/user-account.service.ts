import { Injectable } from '@angular/core';

import{ Character } from '../classes/character/Character';

import { CharactersService } from './characters/characters.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  accounts:Character[] = [];
  // TODO: create an observable
  // TODO: trigger the observable after appending or removing
  // TODO: observable returns the new accounts

  constructor(
    public characterService: CharactersService
  ) {
    if( localStorage.getItem('accounts') !== null )
    {
      let accounts = JSON.parse( localStorage.getItem('accounts') );
      accounts.forEach( account => {
        this.add_account( account.characterId );
      });
    }
  }
  private add_account( characterId ):void{
    let exists = this.accounts.some( account => {
      return account.characterId === characterId;
    });
    if( exists === false ){
      let character = this.characterService.get_character( characterId );
      this.accounts.push( character );
    }
  }
  public remove_account(): void{
    // TODO: implement method
  }
  public get_account( characterIndex: number ): Character{
    for( let i=0; this.accounts.length > i; i++ ){
      if( this.accounts[i].characterId  === characterIndex ){
        return this.accounts[i];
      }
    }
    // TEMP: alert
    console.log('Account can not be found! Maybe look somewhere else?!?');
  }
}



// TODO: write a validationService
// TODO: all the below:
// after reirect of teh account verification we will get a:
// * access token
// * refresh token
// * token expiration time ( will need to check this every minute through the app-state? And refresh when necessary. The appstate will set the frequency and UserAccountService will figure out when to update )
// * With this info we can verify through our own server and get the characterId
// * characterId
// characterId, and refresh token should be stored in a cookie
// With the token and characterId we can gather all kinds of information
// * characterImageUrls
// * characterName
