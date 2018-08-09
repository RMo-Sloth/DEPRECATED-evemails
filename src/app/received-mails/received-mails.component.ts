import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  mails: Mail[];
  constructor(
    public  appStateService : AppStateService,
    private route: ActivatedRoute
  ) {
    const accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.userAccountService = this.appStateService.get_account( accountIndex );
    this.mailService = this.userAccountService.get_mailService();
    this.account_id = this.userAccountService.get_characterIndex();
  }
  ngOnInit() {
    this.appStateService.currentPageName='mails';
    this.mailService.getMails()
        .subscribe(mails => this.mails = mails);
  }
  // TODO: click on a read-more button to retreive more mails
}
