import { Component, OnInit, Input, Output, EventEmitter,HostBinding } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { HttpClient } from '@angular/common/http';
import { fromEvent, Observable, BehaviorSubject, of, merge, from, timer } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, concatMap } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
} from '@angular/animations'


@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css'],
  animations: [

    trigger('newCharacter', [

     transition('*=>*', [

        query(':enter',
          style({
            transform: 'scale(0)',
            height: '0px',
            padding: '0px',
          }),
        { optional: true }

        ), // end query

        query(
          ':enter',
          stagger(
            '100ms',
            animate(
              '100ms',
              style(
                {
                  transform:'scale(1)',
                  height: '40px',
                  padding: '5px',
                })
              ), // end animate
            ), // end stagger
          { optional: true }
          ) // end query

     ]), // end transition
   ]), // end trigger newCharacter

 ] // end animations
})
export class CharacterSelectionComponent implements OnInit {

  public characters: any[];
  public characterIndexes: number[];
  public showNoResults: boolean;
  public showMoreResults: boolean;

  @Input() accountIndex: number;
  @Output() selectedCharacter: EventEmitter<number> = new EventEmitter;
  @Output() isDisplayed: EventEmitter<boolean> = new EventEmitter;

  constructor(
    private characterService: CharacterService,
    private http: HttpClient,
  ) {
    this.characters = [];
    this.characterIndexes = [];
    this.showNoResults = true;
    this.showMoreResults = false;
  }

  ngOnInit() {
    let searchBox = document.getElementById('search-box');
    let searchTrigger = fromEvent(searchBox, 'input')
    .pipe(
      debounceTime( 650 ),
      distinctUntilChanged(),
      map((event: any) => event.target.value ),
      switchMap( (searchString: string) => {
        if( searchString.length > 2 ){
          return this.process_searchString( searchString );
        } else if ( searchString.length <= 2 ) {
          this.showNoResults = true;
          return new BehaviorSubject( [] );
        }
      }),
    );

    searchTrigger.subscribe( (characterIndexes: number[]) => {
      this.characterIndexes = characterIndexes;
      this.characters = [];
      this.showMoreResults = false;
      if( characterIndexes.length > 0 ){
        this.load_10characters();
      } else {
        this.showNoResults = true;
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

  private add_character( characterIndex ): any{
      return this.characterService.get_character( characterIndex )
  }

  public load_10characters(){
    this.showMoreResults = false;
    let newCharacters = [];
    let amountToAdd = this.characterIndexes.length > 10 ? 10 : this.characterIndexes.length;
    for(let i=0; i<amountToAdd; i++){
      let characterIndex = this.characterIndexes.shift();
      this.add_character( characterIndex )
      .subscribe( character => {
        newCharacters.push( character );
        if( newCharacters.length === amountToAdd){
          newCharacters.sort((a, b) => {
            return a.name.localeCompare( b.name );
          });
          this.showNoResults = false;
          newCharacters.forEach( ( character, index )=> {
            this.characters.push( character );
          });
          this.showMoreResults = this.characterIndexes.length > 0 ? true : false;
        }
      });
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
