import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Character } from './Character';
import { PortraitsMethodsService } from './portraits/portraits-methods.service';

@Injectable({
  providedIn: 'root'
})

// important: To ensure consistency these methods should not be called from modules, only other services.
export class CharacterMethodsService {
  constructor(
    public httpClient: HttpClient,
    public portraitsMethodsService: PortraitsMethodsService
  ) { }
  public append_characterDetails( character: Character ): void{
    this.httpClient.get(`https://esi.evetech.net/latest/characters/${character.characterId}/?datasource=tranquility`)
    .subscribe( (characterDetails: any) => {
      character.name$.next(characterDetails.name);
      character.gender = characterDetails.gender;
      character.corporation_id = characterDetails.corporation_id;
      character.birthday = new Date( characterDetails.birthday );
    });
  }
  public append_characterPortraits( character: Character ): void{
    this.portraitsMethodsService.append_characterPortraits( character.portraits, character.characterId );
  }
}
