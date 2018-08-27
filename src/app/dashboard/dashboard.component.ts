import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import{ Account } from '../classes/account/Account';

import { AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { SignupService } from '../services/signup/signup.service';

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
    private route: ActivatedRoute,
    private signupService: SignupService
  )
  {}

  ngOnInit() {
    this.appStateService.currentPageName = 'dashboard';
    this.accounts$ = this.userAccountService.accounts$;
    // TEMP: temporary way to obtain parameter values from the url
    this.route.fragment.subscribe( fragment => {
    console.log(fragment); // TODO: why is this undefined after navigation from a mailbox, etc?!?!
      if( fragment !== null){
        let params: any = fragment.split("&");
        let paramArray: any = [];
          params.forEach( param => {
            param = param.split('=');
            paramArray[param[0]] = param[1];
          });
          if( paramArray.access_token !== null ){
            let accessToken = paramArray.access_token;
            this.signupService.signup_account( accessToken );
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
}
