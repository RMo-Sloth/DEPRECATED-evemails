import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Character } from './Character';

@Injectable({
  providedIn: 'root'
})

// important: To ensure consistency these methods should not be called from modules, only other services.
export class CharacterMethodsService {
  constructor(
    public httpClient: HttpClient
  ) { }
  public append_characterDetails( character: Character ): void{
    this.httpClient.get(`https://esi.evetech.net/latest/characters/${character.characterId}/?datasource=tranquility`)
    .subscribe( (characterDetails: any) => {
      character.name = characterDetails.name;
      character.gender = characterDetails.gender;
      character.corporation_id = characterDetails.corporation_id;
      character.birthday = new Date( characterDetails.birthday );
    });
  }
  public append_characterPortraits( character: Character ): void{
    this.httpClient.get(`https://esi.evetech.net/latest/characters/${character.characterId}/portrait/?datasource=tranquility`)
    .subscribe( (portraits: any) => {
      character.portraits = {
        px64x64: portraits.px64x64,
        px128x128: portraits.px128x128,
        px256x256: portraits.px256x256,
        px512x512: portraits.px512x512
      }
    });
  }
}
