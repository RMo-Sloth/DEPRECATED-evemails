import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  
  private pageTitle$: BehaviorSubject<string>;

  constructor() {
    this.pageTitle$ = new BehaviorSubject('EVE-mails.com');
  }

  public get_pageTitle(): BehaviorSubject<string>{
    return this.pageTitle$;
  }

  public set_pageTitle( pageTitle: string ): void{
    this.pageTitle$.next( pageTitle );
  }
}
