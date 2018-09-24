import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { CharacterService } from '../../services/character.service';
import { SignoutService } from '../../services/signout.service';

// interfaces
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  @Input() accountIndex: number;
  private character: Character;
  constructor(
    private characterService: CharacterService,
    private signoutService: SignoutService,
  ) { }

  ngOnInit() {
    this.characterService.get_character( this.accountIndex )
    .subscribe( character => {
      this.character = character;
    });
  }

  private account_signout(){
    // TEMP: might want to replace the confirm with a styled popup at some point
    if ( window.confirm(`Are you sure you want to remove ${this.character.name}'s account?`) === true ){
      this.signoutService.remove_account( this.character.index );
    }
  }

}
