import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.css']
})

export class ScreensaverComponent implements OnInit {

  private pageTitle$: BehaviorSubject<string>;

  constructor(
    private pageTitleService: PageTitleService
  ) { }

  ngOnInit() {
    this.pageTitle$ = this.pageTitleService.get_pageTitle();
  }

}
