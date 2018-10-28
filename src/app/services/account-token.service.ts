import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

/* INTERFACES */
interface IntervalSubscription {
  accountIndex: number;
  intervalSubscription: any; // TODO: What should I typecheck for?
}

@Injectable({
  providedIn: 'root'
})

export class AccountTokenService {

  private intervalSubscriptions: IntervalSubscription[];

  constructor(
    private http: HttpClient,
  ) {
    this.intervalSubscriptions = [];
  }

  public initiate_tokenUpdater( refreshToken: string, accountIndex: number ): Observable<string> {
    return new Observable( observer => {
      let intervalSubscription = interval(1100000)
      .subscribe( () => {
        this.update_accessToken( refreshToken )
        .subscribe( accessToken => {
          console.log('Interval triggered!');
          observer.next( accessToken );
        });
      });

      let newintervalSubscriptions = {
        accountIndex: accountIndex,
        intervalSubscription: intervalSubscription
      };
      this.intervalSubscriptions.push( newintervalSubscriptions );
    });
  }

  public end_tokenUpdater( accountIndex ): void {
    if( this.intervalSubscriptionExists( accountIndex ) === true) {
      let intervalSubscription = this.get_intervalSubscription( accountIndex );
      intervalSubscription.intervalSubscription.unsubscribe();
      this.remove_intervalSubscription( accountIndex );
    }
  }

  public update_accessToken( refreshToken: string ): Observable<string>{
    return new Observable( observer => {
      this.request_newAccesstoken( refreshToken )
      .subscribe( accessToken => {
          observer.next( accessToken );
          observer.complete();
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

  private intervalSubscriptionExists( accountIndex: number  ): boolean {
    return this.intervalSubscriptions.some( interval => interval.accountIndex === accountIndex );
  }

  private get_intervalSubscription( accountIndex: number ): IntervalSubscription {
    return this.intervalSubscriptions.find( interval => interval.accountIndex === accountIndex );
  }

  private remove_intervalSubscription( accountIndex: number ): void {
    this.intervalSubscriptions = this.intervalSubscriptions.filter( interval => {
      return interval.accountIndex !== accountIndex
    });
  }
}
