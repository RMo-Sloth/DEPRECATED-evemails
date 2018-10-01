import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  private account_signup(){
      location.href="https://login.eveonline.com/oauth/authorize?response_type=token&redirect_uri=http://localhost:4200/dashboard&Client_id=ca211b71e15249ed8ce2d36f034f6024&scope=esi-mail.organize_mail.v1%20esi-mail.read_mail.v1%20esi-mail.send_mail.v1";
  }
}
