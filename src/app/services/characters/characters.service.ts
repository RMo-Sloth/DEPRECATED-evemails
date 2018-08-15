import { Injectable } from '@angular/core';

import { Character } from '../../classes/Character';

import { CharacterHttpService } from '../http/character/characterHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  characters: Character[] = [];
  constructor(
    public characterHttpService: CharacterHttpService
  ) { }
  private add_character( characterId: number ): void {
    let exists = this.characters.some( character => {
      return character.characterId === characterId;
    });
    if( exists === false ){
      let character = new Character( characterId );
      this.append_characterPortraits( character );
      this.characters.push( character );
    }
  }
  public get_character( characterId: number ): Character {
    return this.characters.find( character => {
      return character.characterId === characterId;
    });
  }
  // private append_characterDetails( character: Character ): Character{
    // append public characterInfo
  // }
  public append_characterPortraits( character: Character ): void{
    this.characterHttpService.getPortraitUrls( character.characterId )
        .subscribe( (portraits: any) => { // TODO: maybe create a typescript interface for the response object
          character.portraits = {
            px64x64: portraits.px64x64,
            px128x128: portraits.px128x128,
            px256x256: portraits.px256x256,
            px512x512: portraits.px512x512
          }
        });
  }
}
