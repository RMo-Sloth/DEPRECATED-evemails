import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mail } from '../classes/mail/Mail';
import{ Character } from '../classes/character/Character';
import{ Account } from '../classes/account/Account';

import { PageTitleService } from '../services/page-title.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  account: Account;
  mail: Mail;
  navigationButtons; // TODO: typecheck
  constructor(
    public pageTitleService: PageTitleService,
    public userAccountService: UserAccountService,
    public mailService: MailService,
    private route: ActivatedRoute
  ) {
    const account_id = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.account = this.userAccountService.get_account( account_id );

    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'envelope', routerUrl: `/${account_id}/mails`}
    ];
  }

  ngOnInit() {
    let mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
    this.mail = this.mailService.getMail( this.account, mailIndex );
        // .subscribe(mail => this.mail = mail);
    this.account.character.name$.asObservable().subscribe( name => {
      this.pageTitleService.set_pageTitle( name );
    });
  }

}
