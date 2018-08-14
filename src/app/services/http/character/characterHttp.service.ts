import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterHttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPortraitUrls( characterIndex ) {
    return this.httpClient.get(`https://esi.evetech.net/latest/characters/${characterIndex}/portrait/?datasource=tranquility`);
  }
}
