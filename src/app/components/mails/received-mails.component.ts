import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// interfaces
import { Mail } from '../../interfaces/mail';
import { Character } from '../../interfaces/character';
import { Account } from '../../interfaces/account';
import { NavigationButton } from '../../interfaces/navigation-button';

// services
import { PageTitleService } from '../../services/page-title.service';
import { CharacterService } from '../../services/character.service';
import{ MailService } from '../../services/mail.service';
import{ MailFilterService } from '../../services/mail-filter.service';

@Component({
  selector: 'app-received-mails',
  templateUrl: './received-mails.component.html',
  styleUrls: ['./received-mails.component.css']
})
export class ReceivedMailsComponent implements OnInit {

  public accountIndex: number;
  public mails$: BehaviorSubject<Mail[]>;
  public navigationButtons: NavigationButton[];

  constructor(
    private route: ActivatedRoute,
    private pageTitleService : PageTitleService,
    private characterService: CharacterService,
    private mailService: MailService,
    private mailFilterService: MailFilterService,
  ) {
    this.accountIndex = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      /*{ faClass: 'search', routerUrl: '/dashboard'} */
      { faClass: 'pencil', routerUrl: `/${this.accountIndex }/mail/new`}
    ];
  }
  ngOnChanges(){
  }
  ngOnInit() {
    this.mails$ = new BehaviorSubject([]);
    this.mails$ = this.mailFilterService.filteredMails$;
    this.mailFilterService.set_filterAccountIndex( this.accountIndex );
    this.characterService.get_character( this.accountIndex )
    .subscribe( character => {
      this.pageTitleService.set_pageTitle( `${character.name} <br> inbox` );
    });
    this.mailService.get_initialMails( this.accountIndex );
  }
}
// TODO: apply interface for filtering on name and subject
