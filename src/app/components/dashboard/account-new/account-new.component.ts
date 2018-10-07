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
    if( window.confirm( 'By continuing you accept that EVE-mails.com will store some information on your computer. You will be immidiately logged in from this device on your next visit. Please make sure not to expose your mails to others and remove the accounts when you are using a publically available computer, etc..' ) === true ) {
      /* development signup
      location.href="https://login.eveonline.com/oauth/authorize?response_type=token&redirect_uri=http://localhost:4200/dashboard&Client_id=ca211b71e15249ed8ce2d36f034f6024&scope=esi-mail.organize_mail.v1%20esi-mail.read_mail.v1%20esi-mail.send_mail.v1";
      */
      /* production signup */
      location.href="https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2Fwww.eve-mails.com&client_id=31fb6d6b42ef4528a267376f4b73d19f&scope=esi-mail.organize_mail.v1%20esi-mail.read_mail.v1%20esi-mail.send_mail.v1";
    }
  }
}
