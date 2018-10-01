import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// interfaces
import{ Account } from '../../interfaces/account';

// services
import { PageTitleService } from '../../services/page-title.service';
import { SignupService } from '../../services/signup.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public accounts$: BehaviorSubject<Account[]>;

  constructor(
    private pageTitleService: PageTitleService,
    private accountService : AccountService,
    private route: ActivatedRoute,
    private signupService: SignupService,
  )
  {}

  ngOnInit() {
    this.pageTitleService.set_pageTitle( 'dashboard' );
    this.accounts$ = this.accountService.accounts$;

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
