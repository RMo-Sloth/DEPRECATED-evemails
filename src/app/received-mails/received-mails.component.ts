import { Component, OnInit } from '@angular/core';

import { Mail } from '../mail';

import{ MailService } from '../mail.service';

@Component({
  selector: 'app-received-mails',
  templateUrl: './received-mails.component.html',
  styleUrls: ['./received-mails.component.css']
})
export class ReceivedMailsComponent implements OnInit {

  constructor(
    private mailService : MailService
  ) { }
  mails: Mail[];
  ngOnInit() {
    this.mailService.getMails()
        .subscribe(mails => this.mails = mails);
  }

}
