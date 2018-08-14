import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor(
    private http: HttpClient
  ) { }
  get_imageUrls( characterId ){
    return this.http.get(`https://esi.evetech.net/latest/characters/${characterId}/portrait/?datasource=tranquility`);
  }
}
