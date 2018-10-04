import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  
  private characters: Character[];

  constructor(
    private http: HttpClient
  ) {
    this.characters = [];
  }

  public get_character( index: number ): Observable<Character>{
    return new Observable( observer => {
      if( this.isRegisteredCharacter( index ) === true ){
        let character = this.characters.find( character => {
          return character.index === index;
        });
        observer.next( character );
        observer.complete();
      }else{
        this.add_character( index )
        .subscribe( character => {
          observer.next( character );
          observer.complete();
        });
      }
    }); // end observable
  }

  private add_character( index: number ): Observable<Character>{
    return new Observable( observer => {
      let details: Observable<any> = this.http.get(`https://esi.evetech.net/latest/characters/${index}/?datasource=tranquility`);
      let portraits: Observable<any>  = this.http.get(`https://esi.evetech.net/latest/characters/${index}/portrait/?datasource=tranquility`);
      forkJoin([ details, portraits ]).subscribe( results => {
        const details = results[0];
        const portraits = results[1];
        const character: Character = {
          index: index,
          name: details.name,
          corporation: details.corporation_id,
          portraits: {
            px64x64: portraits.px64x64,
            px128x128: portraits.px128x128,
            px256x256: portraits.px256x256,
            px512x512: portraits.px512x512
          }
        }
        // extra check if the corporation is added ( possibly during the request delay )
        if( this.isRegisteredCharacter( index ) === false ){
          this.characters.push( character );
        }
        observer.next( character );
        observer.complete();
      }); // end subscribe
    }); // end observable
  }

  private isRegisteredCharacter( index: number ): boolean{
    return this.characters.some( character => {
      return character.index === index;
    });
  }

}
