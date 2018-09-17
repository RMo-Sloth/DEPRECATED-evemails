import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// interfaces
import { Mail } from '../interfaces/mail';
import { Character } from '../interfaces/character';
import { Account } from '../interfaces/account';
import { NavigationButton } from '../interfaces/navigation-button';

// services
import { PageTitleService } from '../services/page-title.service';
import { CharacterService } from '../services/character.service';
import{ MailService } from '../services/mail.service';

@Component({
  selector: 'app-received-mails',
  templateUrl: './received-mails.component.html',
  styleUrls: ['./received-mails.component.css']
})
export class ReceivedMailsComponent implements OnInit {
  accountIndex: number;
  mails: Mail[]; //// TODO: maybe should be an observable
  navigationButtons: NavigationButton[];
  constructor(
  private route: ActivatedRoute,
    private pageTitleService : PageTitleService,
    private characterService: CharacterService,
    private mailService: MailService,
  ) {
    this.accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.mails = [];
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'search', routerUrl: '/dashboard'},
      { faClass: 'pencil', routerUrl: `/${this.accountIndex }/new-mail`}
    ];
  }
  ngOnInit() {
    this.pageTitleService.set_pageTitle( 'mails' );
    this.characterService.get_character( this.accountIndex )
    .subscribe( character => {
      this.pageTitleService.set_pageTitle( character.name );
    });
    this.mailService.get_inboxMails( this.accountIndex )
    //     .subscribe(mails => this.mails = mails);
  }
  // TODO: click on a read-more button to retreive more mails
  // TODO: apply filters on ngOnInit() ( before view )
  // TODO: apply interface for filtering on name and subject
}
