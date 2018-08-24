import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MailAccount } from '../classes/MailAccount';
import{ Character } from '../classes/character/Character';

import { AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { VerificationService } from '../services/verification/verification.service';

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
    public localStorageService: LocalStorageService,
    public verificationService: VerificationService
  )
  {
    // TODO:  loaclstorage should be added if it is provided in the url
  }

  ngOnInit() {
    this.appStateService.currentPageName = 'dashboard';
    this.accounts$ = this.userAccountService.accounts$;


    // TEMP: tests
    this.verificationService.add_account( 100, 'res', 'ac' );
    this.verificationService.add_account( 100, 're', 'ac' );
    // this.verificationService.update_accessToken( 100, 'hello-token' )
    console.log(
      this.verificationService.accounts
    );
  }
  private account_signup(){
      location.href="https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=http://localhost:4200/dashboard&Client_id=ca211b71e15249ed8ce2d36f034f6024&scope=esi-mail.read_mail.v1%20esi-mail.organize_mail.v1%20esi-mail.send_mail.v1";
  }
  private remove_account( character: Character ){
    // TEMP: might want to replace the confirm with a styled popup at some point
    if ( window.confirm(`Are you sure you want to remove ${character.name}'s account?`) === true){
      this.userAccountService.remove_account( character.characterId );
      this.localStorageService.remove_account( character.characterId );
      // TODO: remove account from tokenservice
      // TODO: remove accounts from mailservice
    }
  }
}
