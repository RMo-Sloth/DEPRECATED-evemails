import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MailAccount } from '../classes/MailAccount';
import{ Character } from '../classes/character/Character';

import { AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public accounts$: BehaviorSubject<Character[]>;

  constructor(
    public  appStateService : AppStateService,
    public  userAccountService : UserAccountService,
    public mailService: MailService,
    public localStorageService: LocalStorageService
  )
  {
    // TODO:  loaclstorage should be added if it is provided in the url
    // TEMP: temporarily add localstorage until localStorage has been extended
    localStorage.setItem('accounts', JSON.stringify(
        [{
          characterId: 93920413,// TEMP:
          refreshToken: 'token',// TEMP:
        },
        {
          characterId: 93898701,// TEMP:
          refreshToken: 'token',// TEMP:
        }]
      )
    );
  }

  ngOnInit() {
    this.appStateService.currentPageName='dashboard';
    this.accounts$ = this.userAccountService.accounts$;

    // TEMP: localStorageService testing
    console.log( this.localStorageService.get_accounts() );

  }
  private account_signup(){
      location.href="https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=https://www.eve-mails.com&Client_id=31fb6d6b42ef4528a267376f4b73d19f&scope=esi-mail.read_mail.v1%20esi-mail.organize_mail.v1%20esi-mail.send_mail.v1";
  }
  private remove_account( character: Character ){
    // TEMP: might want to replace the confirm with a styled popup at some point
    if ( window.confirm(`Are you sure you want to remove ${character.name}'s account?`) === true){
      this.userAccountService.remove_account( character.characterId );
      // TODO: remove account from localstorageservice
      // TODO: remove account from tokenservice
      // TODO: remove accounts from mailservice
    }
  }
}
