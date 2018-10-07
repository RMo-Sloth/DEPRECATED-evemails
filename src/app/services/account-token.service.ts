import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* INTERFACES */
interface Interval {
  accountIndex: number;
  interval: any; // TODO: What should I typecheck for?
}

@Injectable({
  providedIn: 'root'
})

export class AccountTokenService {

  private intervals: Interval[];

  constructor(
    private http: HttpClient,
  ) {
    this.intervals = [];
  }

  public initiate_tokenUpdater( refreshToken: string, accountIndex: number ): Observable<string> {
    return new Observable( observer => {
      let interval = window.setInterval(
        this.update_accessToken( refreshToken )
        .subscribe( accessToken => {
          observer.next( accessToken );
        }),
        1100000
      )
      let newInterval = {
        accountIndex: accountIndex,
        interval: interval
      };
      this.intervals.push( newInterval );
    });
  }

  public end_tokenUpdater( accountIndex ): void {
    if( this.intervalExists( accountIndex ) === true) {
      let interval = this.get_interval( accountIndex );
      window.clearInterval( interval.interval );
      this.remove_interval( accountIndex );
    }
  }

  private update_accessToken( refreshToken: string ): Observable<string>{
    return new Observable( observer => {
      this.request_newAccesstoken( refreshToken )
      .subscribe( accessToken => {
          observer.next( accessToken );
      });
    });
  }

  private request_newAccesstoken( refreshToken: string ): Observable<string> {
    return new Observable( observer => {
      this.http.post( `https://www.eve-mails.com/php/authorization-refresh.php`, { refresh_token: refreshToken })
      .subscribe( ( response: any ) => {
        observer.next( response.access_token );
        observer.complete();
      });
    });
  }

  private intervalExists( accountIndex: number  ): boolean {
    return this.intervals.some( interval => interval.accountIndex === accountIndex );
  }

  private get_interval( accountIndex: number ): Interval {
    return this.intervals.find( interval => interval.accountIndex === accountIndex );
  }

  private remove_interval( accountIndex: number ): void {
    this.intervals = this.intervals.filter( interval => {
      return interval.accountIndex !== accountIndex
    });
  }
}
