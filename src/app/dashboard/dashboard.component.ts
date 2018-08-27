import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import{ Account } from '../classes/account/Account';

import { AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { VerificationService } from '../services/verification/verification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public accounts$: BehaviorSubject<Account[]>;

  constructor(
    public  appStateService : AppStateService,
    public  userAccountService : UserAccountService,
    public localStorageService: LocalStorageService,
    public verificationService: VerificationService,
    public http: HttpClient,
    private route: ActivatedRoute
  )
  {
    // TODO:  loaclstorage should be added if it is provided in the url
  }

  ngOnInit() {
    this.appStateService.currentPageName = 'dashboard';
    this.accounts$ = this.userAccountService.accounts$;
    // TEMP: temporary way to obtain parameter values from the url
    this.route.fragment.subscribe( fragment => {
      if( fragment !== null){
        let params: any = fragment.split("&");
        let paramArray: any = [];
          params.forEach( param => {
            param = param.split('=');
            paramArray[param[0]] = param[1];
          });
          if( paramArray.access_token !== null ){
            let accessToken = paramArray.access_token;
            this.get_accountInfo( accessToken )
              .subscribe( (accountInfo: any) => {
                let characterId: number = accountInfo.CharacterID;
                let accessToken: string = paramArray.access_token;
                let refreshToken: string = 'refresh-token';
                this.add_account( characterId, accessToken, refreshToken );
              });
          }
      }
    });
  }
  private account_signup(){
      location.href="https://login.eveonline.com/oauth/authorize?response_type=token&redirect_uri=http://localhost:4200/dashboard&Client_id=ca211b71e15249ed8ce2d36f034f6024";
  }
  private remove_account( account: Account ){
    // TEMP: might want to replace the confirm with a styled popup at some point
    if ( window.confirm(`Are you sure you want to remove ${account.character.name}'s account?`) === true ){
      this.userAccountService.remove_account( account.character.characterId );
      this.localStorageService.remove_account( account.character.characterId );
      // TODO: remove account from tokenservice
      // TODO: remove accounts from mailservice
    }
  }
  // TODO: maybe refactor to s seperate authentication service
  private authenticate_account( authorization_code: string ){

  }
  private add_account( characterId: number, accessToken: string, refresh_token: string ){
    this.userAccountService.add_account( characterId );
    this.localStorageService.add_account( characterId, accessToken, refresh_token );
  }
  // TODO: refactor to seperate service
  private get_accountInfo( accessToken ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
    };
    // there was an issue where the old accountInfo got loaded repeatably.
    // the accessToken is added to the url to prevent browser-caching.
    return this.http.get(`https://esi.tech.ccp.is/verify/?token=${accessToken}`, httpOptions);
  }
}
