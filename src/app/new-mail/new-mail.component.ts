import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {

  account_id: number;
  navigationButtons; // TODO: add type

  constructor(
    private route: ActivatedRoute
  ) {
    this.account_id = parseInt( this.route.snapshot.paramMap.get('account_id') );
    this.navigationButtons = [
      { faClass: 'home', routerUrl: '/dashboard'},
      { faClass: 'envelope', routerUrl: `/${this.account_id}/mails`}
    ];
  }

  ngOnInit() {
  }

}
