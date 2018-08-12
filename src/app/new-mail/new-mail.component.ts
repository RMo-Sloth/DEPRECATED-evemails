import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {

  account_id: number;
  userAccountService: UserAccountService;
  navigationButtons; // TODO: add type

  constructor(
    private route: ActivatedRoute,
    public  appStateService : AppStateService
  ) {
    this.account_id = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.userAccountService = this.appStateService.get_account( this.account_id );
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'envelope', routerUrl: `/${this.account_id}/mails`}
    ];
  }

  ngOnInit() {
    this.appStateService.currentPageName = this.userAccountService.characterName;
  }

}
