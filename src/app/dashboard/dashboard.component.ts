import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import{ Account } from '../classes/account/Account';

import { PageTitleService } from '../services/page-title.service';
import { UserAccountService } from '../services/user-account.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { SignupService } from '../services/signup/signup.service';
import { SignoutService } from '../services/signout/signout.service';

// TEMP:
import { CharacterService } from '../services/character.service';

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
    private signoutService: SignoutService,
    // TEMP:
    private CharacterService: CharacterService
  )
  {}

  ngOnInit() {
    this.pageTitleService.set_pageTitle( 'dashboard' );
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
          }
      }
    });

    // TEMP:
    this.CharacterService.get_character( 95923637 )
      .subscribe( corporation => console.log( corporation ) );
    this.CharacterService.get_character( 95923637 )
      .subscribe( corporation => console.log( corporation ) );

  }
  private account_signup(){
      location.href="https://login.eveonline.com/oauth/authorize?response_type=token&redirect_uri=http://localhost:4200/dashboard&Client_id=ca211b71e15249ed8ce2d36f034f6024&scope=esi-mail.organize_mail.v1%20esi-mail.read_mail.v1%20esi-mail.send_mail.v1";
  }
  private account_signout( account: Account ){
    // TEMP: might want to replace the confirm with a styled popup at some point
    if ( window.confirm(`Are you sure you want to remove ${account.character.name$}'s account?`) === true ){
      this.signoutService.remove_account( account );
    }
  }
}
