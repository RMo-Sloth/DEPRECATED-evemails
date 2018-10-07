import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* INTERFACES */
import { Account } from '../interfaces/account';
interface Interval {
  accountIndex: number;
  interval: any; // TODO: What should I typecheck for?
}

/* SERVICES */
import { AccountHttpService } from './account-http.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})

export class AccountTokenService {

  private intervals: Interval[];

  constructor(
    private accountHttp: AccountHttpService,
    private account: AccountService,
    private http: HttpClient,
  ) {
    this.intervals = [];
  }

  public initiate_tokenUpdater( accountIndex: number ): void {
    let interval = window.setInterval(
      this.update_accessToken( accountIndex ),
      1100000
    );
    let newInterval = {
      accountIndex: accountIndex,
      interval: interval
    };
    this.intervals.push( newInterval );
  }

  public end_tokenUpdater( accountIndex ): void {
    let interval = this.get_interval( accountIndex );
    window.clearInterval( interval.interval );
    this.remove_interval( accountIndex );
  }

  private update_accessToken( accountIndex ){
    this.request_newAccesstoken( accountIndex )
    .subscribe( accessToken => {
      this.account.update_accessToken( accessToken, accountIndex );
    });
  }

  private request_newAccesstoken( accountIndex ): Observable<string> {
    return new Observable( observer => {
      this.accountHttp.get_headers( accountIndex )
      .subscribe( ( httpHeaders: any ) => {
        this.account.get_account( accountIndex )
        .subscribe( ( account: Account ) => {
          this.http.post( `https://www.eve-mails.com/php/authorization-refresh.php`, { refresh_token: account.refreshToken },  httpHeaders )
          .subscribe( ( response: any ) => {
            observer.next( response.access_token );
            observer.complete();
          });
        });
      });
    });
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
