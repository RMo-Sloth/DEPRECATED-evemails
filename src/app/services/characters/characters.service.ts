import { Injectable } from '@angular/core';

import { Character } from '../../classes/character/Character';
import { CharacterMethodsService } from '../../classes/character/character-methods.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  characters: Character[] = [];
  constructor(
    public characterMethods: CharacterMethodsService
  ) { }
  private add_character( characterId: number ): void {
    let exists = this.characters.some( character => {
      return character.characterId === characterId;
    });
    if( exists === false ){
      let character = new Character( characterId );
      // TODO: requesting all info (portraits and cetails might be overkill in some cases)
      this.characterMethods.append_characterPortraits( character );
      this.characterMethods.append_characterDetails( character );
      this.characters.push( character );
    }
  }
  // TODO: the get_character method should be an observable.Maybe in add_charcter
  public get_character( characterId: number ): Character {
    //TODO should the find funciotn be a seperate private method??
    let character =  this.characters.find( character => {
      return character.characterId === characterId;
    });
    if( character !== undefined ){ // character found, return it!
      return character;
    }else{ // character not found, create it!
      this.add_character( characterId );
      character =  this.characters.find( character => {
        return character.characterId === characterId;
      });
      return character;
    }
  }
}
