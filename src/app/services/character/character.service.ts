import { Injectable } from '@angular/core';

import { Character } from '../../classes/character';

import { CharacterHttpService } from '../http/character/characterHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characters: Character[] = [];
  constructor(
    characterHttpService: CharacterHttpService
  ) { }
  private add_character( characterId: number ): void {
    let exists = this.characters.some( character => {
      return character.characterId === characterId;
    });
    if( exists === false ){
      let character = new Character( characterId );
      character = this.append_characterPortraits( character );
      this.characters.push( character );
    }
  }
  public get_character( characterId: number ): Character {
    return this.characters.find( character => {
      return character.characterId === characterId;
    });
  }
  private append_characterDetails( character: Character ): Character{
    // append public characterInfo
  }
  private append_characterPortraits( character: Character ): Character{
    characterHttpService.getPortraitUrls( character.characterId )
        .subscribe( (portraits: any) => { // TODO: maybe create a typescript interface for the response object
          character.portraits = {
            px64x64: portraits.px64x64,
            px128x128: portraits.px128x128,
            px256x256: portraits.px256x256,
            px512x512: portraits.px512x512
          }
          return character;
        });
  }
}
