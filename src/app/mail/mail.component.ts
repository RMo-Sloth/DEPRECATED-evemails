import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppStateService } from '../app-state.service';
//// TODO: can maybe use a next previous button using location???? idk...
// import { Location } from '@angular/common';

import { Mail } from '../mail';

import{ MailService } from '../mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mail: Mail;

  constructor(
    private mailService: MailService,
    private route: ActivatedRoute,
    public appStateService: AppStateService
  ) { }

  ngOnInit() {
    let mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
    this.mail = this.mailService.getMail( mailIndex );
        // .subscribe(mail => this.mail = mail);
    this.appStateService.currentPageName = this.mail.subject
  }

}
