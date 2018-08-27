import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Account } from '../classes/account/Account';
import { Character } from '../classes/character/Character';
import { UserTokens } from '../classes/user-tokens/UserTokens';

import { CharactersService } from './characters/characters.service';

@Injectable({
  providedIn: 'root'
})

// the UserAccountService manages and stores all data related to the various accounts
export class UserAccountService {
  accounts: Account[] = [];
  accounts$: BehaviorSubject<Account[]> = new BehaviorSubject([]);

  constructor(
    public characterService: CharactersService
  ) {
    if( localStorage.getItem('accounts') !== null )
    {
      let accounts = JSON.parse( localStorage.getItem('accounts') );
      accounts.forEach( account => {
        this.add_account( account.characterId, account.accessToken, account.refreshToken );
      });
    }
  }
  public add_account( characterId: number,  accessToken: string, refreshToken: string ):void{
    let exists = this.accounts.some( account => {
      return account.character.characterId === characterId;
    });
    if( exists === false ){
      let account = new Account();
      let character = this.characterService.get_character( characterId );
      let userTokens = new UserTokens();
        userTokens.accessToken = '';
        userTokens.refreshToken = '';
        userTokens.expired = 0;
      account.character = character;
      account.userTokens = userTokens;

      this.accounts.push( account );
      this.accounts$.next( this.accounts );
    }
  }
  public remove_account( characterIndex:number ): void{
    this.accounts = this.accounts.filter( account => {
      return account.character.characterId !== characterIndex;
    });
    this.accounts$.next( this.accounts );
  }
  public get_account( characterIndex: number ): Account{
    for( let i=0; this.accounts.length > i; i++ ){
      if( this.accounts[i].character.characterId  === characterIndex ){
        return this.accounts[i];
      }
    }
    // TEMP: alert
    console.log('Account can not be found! Maybe look somewhere else?!?');
  }
}
