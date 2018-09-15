import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {
  private httpHeaders;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  public get( url: string, account: number ):Observable<any>{
    // get the account
    return new Observable( observer => {
      this.accountService.get_account( account )
      .subscribe( account => {
        this.setAuthorizationHeader( account.accessToken );
        observer.next( this.http.get( url, this.httpHeaders ) );
        observer.complete();
      }, error => {
        observer.error( error );
      }); // end subscribe
    }); // end observable
  }
  private setAuthorizationHeader( accessToken ): void {
    this.httpHeaders.headers.set('Authorization', `Bearer ${accessToken}`);
    console.log('need to remove this message after testing:');
    console.log( this.httpHeaders );
  }
}
