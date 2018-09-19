import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) {}

  public get_headers( accountIndex: number ):Observable<any>{
    /* get the account*/
    return new Observable( observer => {
      this.accountService.get_account( accountIndex )
      .subscribe( account => {
      /* compose headers*/
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${account.accessToken}`
        })
      }
        observer.next( httpOptions );
        observer.complete();
      }, error => {
        observer.error( error );
      }); // end subscribe
    }); /* end observable */
  }
}
