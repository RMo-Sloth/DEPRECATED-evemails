import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

/* INTERFACES */
interface UnreadMailCounter {
  accountIndex: number;
  unreadMailCount$: BehaviorSubject<number>;
  newMailDetected$: BehaviorSubject<boolean>;
  refreshTimeout: any;
}

/* SERVICES */
import { AccountHttpService } from './account-http.service';

@Injectable({
  providedIn: 'root'
})

export class MailCounterService {
  private unreadMailCounters: UnreadMailCounter[];

  constructor(
    private http: HttpClient,
    private accountHttp: AccountHttpService
  ) {
    this.unreadMailCounters = [];
  }

  public get_unreadMailCounter( accountIndex: number ): UnreadMailCounter {
    if( this.unreadMailCounterExists( accountIndex ) === false ){
      this.add_account( accountIndex );
    }
    return this.unreadMailCounters.find( unreadMailCounter => {
      return unreadMailCounter.accountIndex === accountIndex;
    });
  }

  public remove_unreadMailCounter( accountIndex: number ): void {
    let unreadMailCounter = this.get_unreadMailCounter( accountIndex );
    window.clearTimeout( unreadMailCounter.refreshTimeout  );
    let newUnreadMailCounters= this.unreadMailCounters.filter( unreadMailCounter => {
      return unreadMailCounter.accountIndex !== accountIndex;
    });
    this.unreadMailCounters = newUnreadMailCounters;
  }

  public add_account( accountIndex: number ) {
    this.add_unreadMailCounter( accountIndex, 0 );
    this.unreadMailCountLoop( accountIndex );
  }

  private unreadMailCountLoop( accountIndex ) {
    let unreadMailCounter = this.get_unreadMailCounter( accountIndex );
    this.request_unreadMailCount( accountIndex );
    unreadMailCounter.refreshTimeout = window.setTimeout( () => {
      this.unreadMailCountLoop( accountIndex );
    }, 120000 );
  }

  private request_unreadMailCount( accountIndex: number ): any {
    this.accountHttp.get_headers( accountIndex )
    .subscribe( ( httpHeaders: any ) => {
      this.http.get(`https://esi.evetech.net/dev/characters/${accountIndex}/mail/labels/?datasource=tranquility`, httpHeaders )
      .subscribe( ( response: any ) => {
        this.update_unreadMailCount( accountIndex, response.total_unread_count );
      });
    });
  }

  private update_unreadMailCount( accountIndex: number, newUnreadMails: number ) {
    let unreadMailCounter = this.get_unreadMailCounter( accountIndex );
    let oldUnreadMails = unreadMailCounter.unreadMailCount$.getValue();
    if( newUnreadMails > oldUnreadMails ) {
      // new mails detected! Load them to the mailarray.
      unreadMailCounter.newMailDetected$.next( true );
    }
    unreadMailCounter.unreadMailCount$.next( newUnreadMails );
  }

  public get_newMailDetected$( accountIndex: number ): BehaviorSubject<boolean> {
    let unreadMailCounter = this.get_unreadMailCounter( accountIndex );
    return unreadMailCounter.newMailDetected$;
  }

  private add_unreadMailCounter( accountIndex: number, unreadMailCount: number ) {
    let unreadMailCounter = {
      accountIndex: accountIndex,
      unreadMailCount$: new BehaviorSubject( unreadMailCount ),
      newMailDetected$: new BehaviorSubject( false ),
      refreshTimeout: null
    };
    this.unreadMailCounters.push( unreadMailCounter );
  }

  private unreadMailCounterExists( accountIndex: number ): boolean {
    return this.unreadMailCounters.some( unreadMailCounter => {
      return unreadMailCounter.accountIndex === accountIndex;
    });
  }

  public decrease_mailCounter( accountIndex: number ) {
    let unreadMailCounter = this.get_unreadMailCounter( accountIndex );
    let newMailCounter = unreadMailCounter.unreadMailCount$.getValue() - 1;
    unreadMailCounter.unreadMailCount$.next( newMailCounter );
  }
}
