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
      this.append_characterDetails( character );
      this.characters.push( character );
    }
  }
  public get_character( characterId: number ): Character {
    return this.characters.find( character => {
      return character.characterId === characterId;
    });
  }
  public append_characterDetails( character: Character ): void{
    this.characterHttpService.get_characterDetails( character.characterId )
    .subscribe( (characterDetails: any) => { // TODO: maybe create a typescript interface for the response object
      character.name = characterDetails.name;
      character.gender = characterDetails.gender;
      character.corporation_id = characterDetails.corporation_id;
      character.birthday = new Date( characterDetails.birthday );
      console.dir(character);
    });
  }
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
