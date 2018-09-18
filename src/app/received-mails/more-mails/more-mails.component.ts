import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-more-mails',
  templateUrl: './more-mails.component.html',
  styleUrls: ['./more-mails.component.css']
})
export class MoreMailsComponent implements OnInit {
  @Input() accountIndex: number;

  constructor() { }

  ngOnInit() {
  }

  private loadMoreMails(){
    console.log('loading mails');
  }
}
