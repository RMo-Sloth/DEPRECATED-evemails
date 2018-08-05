import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-received-mails',
  templateUrl: './received-mails.component.html',
  styleUrls: ['./received-mails.component.css']
})
export class ReceivedMailsComponent implements OnInit {

  constructor() { }
  // TODO: need to retreive this from a (mocking) service
  mails:[] = [
    {
      senderName: 'Vex Munda',
      senderImage32x32: 'https://image.eveonline.com/Character/93920413_32.jpg',
      title: 'Hello this is the new EVE-mails!',
      sendDate: '4 june'
    },
    {
      senderName: 'Vex Munda',
      senderImage32x32: 'https://image.eveonline.com/Character/93920413_32.jpg',
      title: 'Hello this is the new EVE-mails!',
      sendDate: '4 june'
    },
    {
      senderName: 'Vex Munda',
      senderImage32x32: 'https://image.eveonline.com/Character/93920413_32.jpg',
      title: 'Hello this is the new EVE-mails!',
      sendDate: '4 june'
    }
  ],
  openMail(){
    alert('need to implement opening mails!');
  }
  ngOnInit() {
  }

}
