import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { Corporation } from '../interfaces/corporation';

@Injectable({
  providedIn: 'root'
})
export class CorporationService {
  corporations: Corporation[];

  constructor(
    private http: HttpClient
  ) {
    this.corporations = [];
  }

  public get_corporation( index: number ): Observable<Corporation>{
    return new Observable( observer => {
      if( this.isRegisteredCorporation( index ) === true ){
        let corporation = this.corporations.find( corporation => {
          return corporation.index === index;
        });
        observer.next( corporation );
        observer.complete();
      }else{
        this.add_corporation( index )
        .subscribe( corporation => {
          observer.next( corporation );
          observer.complete();
        });
      }
    }); // end observable
  }
  private add_corporation( index: number ): Observable<Corporation>{
    return new Observable( observer => {
      let details: Observable<any> = this.http.get(`https://esi.evetech.net/latest/corporations/${index}/?datasource=tranquility`);
      let icons: Observable<any>  = this.http.get(`https://esi.evetech.net/latest/corporations/${index}/icons/?datasource=tranquility`);
      forkJoin([ details, icons ]).subscribe( results => {
        const details = results[0];
        const icons = results[1];
        const corporation: Corporation = {
          index: index,
          name: details.name,
          alliance: details.alliance_id,
          url: details.url,
          icons: {
            px64x64: icons.px64x64,
            px128x128: icons.px128x128,
            px256x256: icons.px256x256
          }
        }
        // extra check if the corporation is added ( possibly during the request delay )
        if( this.isRegisteredCorporation( index ) === false ){
          this.corporations.push( corporation );
        }
        observer.next( corporation );
        observer.complete();
      }); // end subscribe
    }); // end observable
  }
  private isRegisteredCorporation( index: number ): boolean{
    return this.corporations.some( corporation => {
      return corporation.index === index;
    });
  }

}
