import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CharactersService } from './http/characters.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private http: HttpClient,
      private charactersService: CharactersService
  ) {
    // this.charactersService.get_imageUrls( 93898701 )
    //     .subscribe( data => {
    //       console.log(data);
    //     });
  }
  get_imageUrls( characterId ){
    return this.http.get(`https://esi.evetech.net/latest/characters/${characterId}/portrait/?datasource=tranquility`);
  }
}
