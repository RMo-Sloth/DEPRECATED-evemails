import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { Alliance } from '../interfaces/alliance';


@Injectable({
  providedIn: 'root'
})
export class AllianceService {

  private alliances: Alliance[];

  constructor(
    private http: HttpClient
  ) {
    this.alliances = [];
  }

  public get_alliance( index: number ): Observable<Alliance>{
    return new Observable( observer => {
      if( this.isRegisteredAlliance( index ) === true ){
        let alliance = this.alliances.find( alliance => {
          return alliance.index === index;
        });
        observer.next( alliance );
        observer.complete();
      }else{
        this.add_alliance( index )
        .subscribe( alliance => {
          observer.next( alliance );
          observer.complete();
        });
      }
  }); // end observable
  }

  private add_alliance( index: number ): Observable<Alliance>{
    return new Observable( observer => {
      let details: Observable<any> = this.http.get(`https://esi.evetech.net/latest/alliances/${index}/?datasource=tranquility`);
      let icons: Observable<any>  = this.http.get(`https://esi.evetech.net/latest/alliances/${index}/icons/?datasource=tranquility`);
      forkJoin([ details, icons ]).subscribe( results => {
        const details = results[0];
        const icons = results[1];
        const alliance: Alliance = {
          index: index,
          name: details.name,
          icons: {
            px64x64: icons.px64x64,
            px128x128: icons.px128x128
          }
        }
        // extra check if the alliance is added ( possibly during the request delay )
        if( this.isRegisteredAlliance( index ) === false ){
          this.alliances.push( alliance );
        }
        observer.next( alliance );
        observer.complete();
      }); // end subscribe
    }); // end observable
  }

  private isRegisteredAlliance( index: number ): boolean{
    return this.alliances.some( alliance => {
      return alliance.index === index;
    });
  }
}
