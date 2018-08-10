import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mail } from '../mail';

import { AppStateService } from '../app-state.service';
import{ UserAccountService } from '../services/user-account.service';
import{ MailService } from '../services/user-account/mail.service';
//// TODO: can maybe use a next previous button using location???? idk...

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  userAccountService: UserAccountService;
  mailService: MailService;
  account_id: number;
  mail: Mail;
  navigationButtons; // TODO: typecheck
  constructor(
    public appStateService: AppStateService,
    private route: ActivatedRoute
  ) {
    const account_id = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.userAccountService = this.appStateService.get_account( account_id );
    this.mailService = this.userAccountService.get_mailService();

    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'envelope', routerUrl: `/${account_id}/mails`}
    ];
  }

  ngOnInit() {
    let mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
    this.mail = this.mailService.getMail( mailIndex );
        // .subscribe(mail => this.mail = mail);
    this.appStateService.currentPageName = 'mail';
  }

}
