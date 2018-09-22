import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* INTERFACES */
import { Mail } from '../interfaces/mail';
import { NavigationButton } from '../interfaces/navigation-button';

/* SERVICES */
import { PageTitleService } from '../services/page-title.service';
import{ MailService } from '../services/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})

export class MailComponent implements OnInit {

  private accountIndex: number;
  private mailIndex: number;
  private mail: Mail;
  private navigationButtons: NavigationButton[];

  constructor(
    private pageTitleService: PageTitleService,
    private mailService: MailService,
    private route: ActivatedRoute
  ) {
    this.accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.mailIndex = parseInt( this.route.snapshot.paramMap.get('mail_id') );
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'envelope', routerUrl: `/${this.accountIndex}/mails`}
    ];
  }

  ngOnInit() {
    this.mailService.get_mail( this.mailIndex, this.accountIndex )
    .subscribe( mail => {
      this.mail = mail;
      console.log(mail)
    });
  }

}
