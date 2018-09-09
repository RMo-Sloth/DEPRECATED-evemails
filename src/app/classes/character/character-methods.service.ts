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
      // character.name$.complete();
      character.gender$.next(characterDetails.gender);
      // character.gender$.complete();
      character.corporation_id$.next( characterDetails.corporation_id );
      // character.corporation_id$.complete();
      character.birthday$.next( new Date( characterDetails.birthday ) );
      // character.birthday$.complete();
    });
  }
  public append_characterPortraits( character: Character ): void{
    this.portraitsMethodsService.append_characterPortraits( character.portraits, character.characterId );
  }
}
