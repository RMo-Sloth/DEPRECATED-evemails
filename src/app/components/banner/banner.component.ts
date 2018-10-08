import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-screensaver',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

  public pageTitle$: BehaviorSubject<string>;

  constructor(
    private pageTitleService: PageTitleService
  ) { }

  ngOnInit() {
    this.pageTitle$ = this.pageTitleService.get_pageTitle();
  }

}
