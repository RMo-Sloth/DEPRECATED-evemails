import { Component, OnInit } from '@angular/core';

import { MailAccount } from '../classes/MailAccount';
import{ Character } from '../classes/character/Character';

import { AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accounts: Character[] = [];

  constructor(
    public  appStateService : AppStateService,
    public  userAccountService : UserAccountService,
    public mailService: MailService
  )
  {
    // TODO:  loaclstorage should be added if it is provided in the url
    // TEMP: temporarily add localstorage until localStorage has been extended
    localStorage.setItem('accounts', JSON.stringify(
        [{
          characterId: 93920413,// TEMP:
          refreshToken: 'token',// TEMP:
          accessToken: '', // TEMP:
          tokenExpirationTime: '' // TEMP:
        },
        {
          characterId: 93898701,// TEMP:
          refreshToken: 'token',// TEMP:
          accessToken: '', // TEMP:
          tokenExpirationTime: '' // TEMP:
        }]
      )
    );
    this.accounts = this.userAccountService.accounts;

    // TEMP: replicate removing an account from this.userAccountService.accounts,
    // it should reflect in the template ( we need an observable)
    window.setTimeout(() => {
    console.log( this.userAccountService.accounts );
      this.userAccountService.remove_account( 93898701 );
      console.log( this.userAccountService.accounts );
    }, 2000);
  }

  ngOnInit() {
    this.appStateService.currentPageName='dashboard';
  }
  private account_signup(){
      location.href="https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=https://www.eve-mails.com&Client_id=31fb6d6b42ef4528a267376f4b73d19f&scope=esi-mail.read_mail.v1%20esi-mail.organize_mail.v1%20esi-mail.send_mail.v1";
  }
}
