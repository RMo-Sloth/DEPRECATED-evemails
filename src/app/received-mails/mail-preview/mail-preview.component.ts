import { Component, OnInit, Input } from '@angular/core';

// interfaces
import { Mail } from '../../interfaces/mail';

@Component({
  selector: 'app-mail-preview',
  templateUrl: './mail-preview.component.html',
  styleUrls: ['./mail-preview.component.css']
})
export class MailPreviewComponent implements OnInit {
  @input() accountIndex: number;
  @input() mail: Mail;

  constructor() { }

  ngOnInit() {
  }


}
