import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CharacterPortraits } from './Character-portraits';

@Injectable({
  providedIn: 'root'
})
export class PortraitsMethodsService {

  constructor(
    public httpClient: HttpClient
  ) { }

  public append_characterPortraits( characterPortraits: CharacterPortraits, characterIndex: number ): void{
    this.httpClient.get(`https://esi.evetech.net/latest/characters/${characterIndex}/portrait/?datasource=tranquility`)
    .subscribe( (portraits: any) => {
        characterPortraits.px64x64$.next( portraits.px64x64 );
        characterPortraits.px128x128$.next( portraits.px128x128 );
        characterPortraits.px256x256$.next( portraits.px256x256 );
        characterPortraits.px512x512$.next( portraits.px512x512 );
    });
  }
}
