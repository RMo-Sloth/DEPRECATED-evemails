import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mail } from '../classes/mail';

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
  navigationButtons; // TODO: typecheck
  constructor(
    public  appStateService : AppStateService,
    private route: ActivatedRoute
  ) {
    this.account_id = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.userAccountService = this.appStateService.get_account( this.account_id );
    this.mailService = this.userAccountService.get_mailService();
    this.account_id = this.userAccountService.get_characterIndex();
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'search', routerUrl: '/dashboard'},
      { faClass: 'pencil', routerUrl: `/${this.account_id}/new-mail`}
    ];
  }
  ngOnInit() {
    this.appStateService.currentPageName='mails';
    this.mailService.getMails()
        .subscribe(mails => this.mails = mails);
  }
  // TODO: click on a read-more button to retreive more mails
  // TODO: apply filters on ngOnInit() ( before view )
  // TODO: apply interface for filtering on name and subject
}
