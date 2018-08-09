import { Component, OnInit } from '@angular/core';

import { Mail } from '../mail';

import{ AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';

@Component({
  selector: 'app-received-mails',
  templateUrl: './received-mails.component.html',
  styleUrls: ['./received-mails.component.css']
})
export class ReceivedMailsComponent implements OnInit {
  mailService: MailService;
  userAccountService: UserAccountService;
  account_id: number;
  constructor(
    public  appStateService : AppStateService
  ) {
    this.userAccountService = this.appStateService.get_account( 93920413 ); // TEMP: 93920413
    this.mailService = this.userAccountService.get_mailService();
    this.account_id = this.userAccountService.get_characterIndex();
  }
  // TODO: mails should change when the mailservice changes
  mails: Mail[];
  ngOnInit() {
    this.mailService.getMails()
        .subscribe(mails => this.mails = mails);
  }
  // TODO: click on a read-more button to retreive more mails
}
