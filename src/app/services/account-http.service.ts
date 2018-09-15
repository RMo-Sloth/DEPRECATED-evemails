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

  public get_headers( account: number ):Observable<any>{
    // get the account
    return new Observable( observer => {
      this.accountService.get_account( account )
      .subscribe( account => {
        // compose headers
        let httpHeaders = new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${account.accessToken}`,
        });
        observer.next( httpHeaders );
        observer.complete();
      }, error => {
        observer.error( error );
      }); // end subscribe
    }); // end observable
  }
}
