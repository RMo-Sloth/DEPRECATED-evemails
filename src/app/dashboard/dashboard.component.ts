import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import{ Account } from '../classes/account/Account';

import { PageTitleService } from '../services/page-title.service';
import { UserAccountService } from '../services/user-account.service';
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
    private pageTitleService: PageTitleService,
    public  userAccountService : UserAccountService,
    private route: ActivatedRoute,
    private signupService: SignupService,
  )
  {}

  ngOnInit() {
    this.pageTitleService.set_pageTitle( 'dashboard' );
    // TODO: this should return indexes of the accounts
    this.accounts$ = this.userAccountService.accounts$;
    // TEMP: temporary way to obtain parameter values from the url
    this.route.fragment.subscribe( fragment => {
    // console.log(fragment); // TODO: why is this undefined after navigation from a mailbox, etc?!?!
      if( fragment !== null && fragment !== undefined ){
        let params: any = fragment.split("&");
        let paramArray: any = [];
          params.forEach( param => {
            param = param.split('=');
            paramArray[param[0]] = param[1];
          });
          if( paramArray.access_token !== null ){
            let accessToken = paramArray.access_token;
            this.signupService.signup_account( accessToken );
            history.replaceState({}, '', '/dashboard');
          }
      }
    });
  }
}
