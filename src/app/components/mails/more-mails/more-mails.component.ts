import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// services
import { MailService } from '../../../services/mail.service';

@Component({
  selector: 'app-more-mails',
  templateUrl: './more-mails.component.html',
  styleUrls: ['./more-mails.component.css']
})
export class MoreMailsComponent implements OnInit {
  @Input() accountIndex: number;
  public displayLoadMoreButton$: BehaviorSubject<boolean>;

  constructor(
    public mailService: MailService,
  ) {
  }

  ngOnInit() {
    this.displayLoadMoreButton$ = new BehaviorSubject( false );

    let lastLoadedMail = this.mailService.get_lastLoadedMail( this.accountIndex );
    lastLoadedMail.allMailsAreLoaded$.subscribe( allMailsAreLoaded => {
      if( allMailsAreLoaded === null ){
        // TODO: make sure allMailsAreLoaded is initialised when loading the first mails
        this.displayLoadMoreButton$.next( false );
      }else{
        this.displayLoadMoreButton$.next( !allMailsAreLoaded );
      }
    });
  }

  public loadMoreMails(): void {
    this.mailService.add_moreMails( this.accountIndex );
  }
}
