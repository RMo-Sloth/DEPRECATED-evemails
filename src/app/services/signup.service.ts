import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* INTERFACES */
import { Account } from '../interfaces/account';
interface BasicAccountInfo {
  CharacterID: number,
  CharacterName: string,
  CharacterOwnerHash: string,
  ExpiresOn: string,
  IntellectualProperty: string,
  TokenType: string
}

/* SERVICES */
import { AccountService } from './account.service';
import { LocalStorageService } from './local-storage.service';
import { MailCounterService } from './mail-counter.service';

@Injectable({
  providedIn: 'root'
})

export class SignupService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private mailCounter: MailCounterService
  ) { }

  public signup_byAuthorizationCode( authorization_code: string ): void {
    this.request_authorization( authorization_code )
    .subscribe( ( response: any ) => {
      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;
      this.request_accountInfo( accessToken )
      .subscribe( (accountInfo: BasicAccountInfo) => {
        const accountIndex = accountInfo.CharacterID;
        const account: Account = {
          index: accountIndex,
          accessToken: accessToken,
          refreshToken: refreshToken,
          authenticationFlow: 'explicit'
        };
        this.register_account( account );
      });
    });
  }

  public signup_account( accessToken ): void {
    // TODO:  we should retreive the accessToken, refreshToken and expiration through a serverside request, the parameter of this function should then be the authorization_code not the accessToken.
    this.request_accountInfo( accessToken )
      .subscribe( (accountInfo: BasicAccountInfo) => {
        const account: Account = {
          index: accountInfo.CharacterID,
          accessToken: accessToken,
          refreshToken: '',
          authenticationFlow: 'implicit'
        };
        this.register_account( account );
      });
  }

  private request_authorization( authorizationCode ): Observable<any> {
    return this.http.get(`https://www.eve-mails.com/php/authorization.php?code=${authorizationCode}`);
  }

  private request_accountInfo( accessToken ): Observable<BasicAccountInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
    };
    // there was an issue where the old accountInfo got loaded repeatably.
    // the accessToken is added to the url to prevent browser-caching.
    return this.http.get<BasicAccountInfo>(`https://esi.tech.ccp.is/verify/?token=${accessToken}`, httpOptions);
  }

  private register_account( account: Account ) {
    this.accountService.add_account( account );
    this.localStorageService.add_account( account );
    this.mailCounter.add_account( account.index );
  }

}
