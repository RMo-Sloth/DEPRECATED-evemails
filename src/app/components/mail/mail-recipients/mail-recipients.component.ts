import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mail-recipients',
  templateUrl: './mail-recipients.component.html',
  styleUrls: ['./mail-recipients.component.css']
})
export class MailRecipientsComponent implements OnInit {

  @Input() recipients: any[]; // todo typecheck

  constructor() { }

  ngOnInit() {
  }

}
