import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { HttpClient } from '@angular/common/http';
import { fromEvent, Observable, BehaviorSubject, of, merge, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, takeWhile, debounceTime, distinctUntilChanged, switchMap, concatMap, mergeMap, takeUntil, concat, last } from 'rxjs/operators';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {

  public characters: any[];
  public characterIndexes: number[];

  @Input() accountIndex: number;
  @Output() selectedCharacter: EventEmitter<number> = new EventEmitter;
  @Output() isDisplayed: EventEmitter<boolean> = new EventEmitter;

  constructor(
    private characterService: CharacterService,
    private http: HttpClient,
  ) {
    this.characters = [];
    this.characterIndexes = [];
  }

  ngOnInit() {
    let searchBox = document.getElementById('search-box');
    let searchTrigger = fromEvent(searchBox, 'input')
    .pipe(
      debounceTime( 500 ),
      distinctUntilChanged(),
      map((event: any) => event.target.value ),
      switchMap( (searchString: string) => {
        if( searchString.length > 2 ){
          return this.process_searchString( searchString );
        } else if ( searchString.length <= 2 ) {
          return new BehaviorSubject( [] );
        }
      }),
    );

    searchTrigger.subscribe( (characterIndexes: number[]) => {
      this.characterIndexes = characterIndexes;
      this.characters = [];
      if( characterIndexes.length > 0 ){
        this.load_10characters();
      }
    });
  }

  ngOnChanges() {
      let searchBox: HTMLElement = document.querySelector('#search-box>input');
      searchBox.focus();
  }

  private process_searchString( searchString: string ): Observable<number[]>{
    return new BehaviorSubject( searchString )
    .pipe(
      concatMap( text => this.request_characterSearch( text ) ),
      concatMap( (response: any) => {
        if( response.character ){
          return this.request_characterNames( response.character )
        } else {
          return of([]);
        }
      }),
      map( (charactersInfo: any[]) => this.sort_alphabetically( charactersInfo ) ),
      map( (charactersInfo: any[]) => charactersInfo.map( characterinfo => characterinfo.id ) ),
    );
  }

  private sort_alphabetically( sortable: any[] ) : any[] {
    return sortable.sort( (a,b) => a.name.localeCompare( b.name ) );
  }

  private request_characterSearch( text ) {
    return this.http.get(`https://esi.evetech.net/v2/search/?categories=character&datasource=tranquility&language=en-us&search=^${text}&strict=false`);
  }

  private request_characterNames( characterIndexes: number[] ){
    return this.http.post('https://esi.evetech.net/latest/universe/names/?datasource=tranquility', characterIndexes);
  }

  private add_character(){
    if( this.characterIndexes.length > 0 ){
      let characterIndex = this.characterIndexes.shift();
      this.characterService.get_character( characterIndex )
      .subscribe( character => {
        this.characters.push( character );
      });
    }
  }

  public load_10characters(){
    // // TODO: fix bug where http-replies arrive in wrong order
    for(let i=0; i<10; i++){
      this.add_character();
    }
  }

  public selectCharacter( characterIndex ){
    this.selectedCharacter.emit( characterIndex );
    this.isDisplayed.emit( false );
  }

  public close_characterSelection(){
    this.isDisplayed.emit( false );
  }
}
