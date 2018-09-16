import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { Mail } from '../classes/mail/Mail';
import{ Character } from '../classes/character/Character';
import{ Account } from '../classes/account/Account';

import { PageTitleService } from '../services/page-title.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';

@Component({
  selector: 'app-received-mails',
  templateUrl: './received-mails.component.html',
  styleUrls: ['./received-mails.component.css']
})
export class ReceivedMailsComponent implements OnInit {
  account: Account;
  navigationButtons; // TODO: typecheck
  constructor(
    private pageTitleService : PageTitleService,
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
    this.account.character.name$.asObservable().subscribe( name => {
        this.pageTitleService.set_pageTitle( name );
    });
    // this.mailService.get_account( characterIndex: number )
    //     .subscribe(mails => this.mails = mails);
  }
  // TODO: click on a read-more button to retreive more mails
  // TODO: apply filters on ngOnInit() ( before view )
  // TODO: apply interface for filtering on name and subject
}
