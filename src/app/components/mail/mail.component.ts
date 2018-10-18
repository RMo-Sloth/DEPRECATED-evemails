import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* INTERFACES */
import { Mail } from '../../interfaces/mail';
import { NavigationButton } from '../../interfaces/navigation-button';

/* SERVICES */
import { PageTitleService } from '../../services/page-title.service';
import{ MailService } from '../../services/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})

export class MailComponent implements OnInit {

  public accountIndex: number;
  public mailIndex: number;
  public mail: Mail;


  public navigationButtons: NavigationButton[];
  public replyRoute: string;

  constructor(
    private pageTitleService: PageTitleService,
    private mailService: MailService,
    private route: ActivatedRoute,
    private router: Router
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
      // trigger update isRead
      if( mail.isRead === false ){
        this.mailService.update_mailAsRead( mail );
      }
    }); // end get_mail()
    // generate replyRoute
    this.replyRoute = `/${this.accountIndex}/mail/reply/${this.mailIndex}`;
  }

  remove() {
    this.mailService.remove_mail( this.mail )
    .subscribe( success => {
      if( success === true ) {
        this.router.navigate([`../`], { relativeTo: this.route });
      } else if ( success === false ) {
        alert('Failed to remove the mail.');
      }
    });
  }
}
