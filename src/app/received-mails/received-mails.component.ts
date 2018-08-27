import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mail } from '../classes/mail/Mail';
import{ Character } from '../classes/character/Character';
import{ Account } from '../classes/account/Account';

import{ AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';

@Component({
  selector: 'app-received-mails',
  templateUrl: './received-mails.component.html',
  styleUrls: ['./received-mails.component.css']
})
export class ReceivedMailsComponent implements OnInit {
  account: Account;
  mails: Mail[];
  navigationButtons; // TODO: typecheck
  constructor(
    public  appStateService : AppStateService,
    public mailService: MailService,
    private route: ActivatedRoute,
    public userAccountService: UserAccountService
  ) {
    const account_id = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.account = this.userAccountService.get_account( account_id );
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'search', routerUrl: '/dashboard'},
      { faClass: 'pencil', routerUrl: `/${this.account.character.characterId}/new-mail`}
    ];
  }
  ngOnInit() {
    this.appStateService.currentPageName = this.account.character.name;
    this.mailService.getMails()
        .subscribe(mails => this.mails = mails);
  }
  // TODO: click on a read-more button to retreive more mails
  // TODO: apply filters on ngOnInit() ( before view )
  // TODO: apply interface for filtering on name and subject
}
