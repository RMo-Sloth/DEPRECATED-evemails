import { Component, OnInit, Input } from '@angular/core';

import{ CharacterService } from '../../../services/character.service';
import{ CorporationService } from '../../../services/corporation.service';
import{ AllianceService } from '../../../services/alliance.service';

@Component({
  selector: 'app-mail-sender',
  templateUrl: './mail-sender.component.html',
  styleUrls: ['./mail-sender.component.css']
})
export class MailSenderComponent implements OnInit {

  public senderName: string;
  public senderPortrait: string;
  public senderCorporation: string;
  public senderAlliance: string;

  @Input() senderIndex: number;

  constructor(
    private characterService: CharacterService,
    private corporationService: CorporationService,
    private allianceService: AllianceService,
  ) { }

  ngOnInit() {
    this.characterService.get_character( this.senderIndex )
    .subscribe( character => {
      this.senderName = character.name;
      this.senderPortrait = character.portraits.px64x64;
      this.corporationService.get_corporation( character.corporation )
      .subscribe( corporation => {
        this.senderCorporation = corporation.name;
        if( corporation.alliance !== undefined ){
          this.allianceService.get_alliance( corporation.alliance )
          .subscribe( alliance => {
            this.senderAlliance = alliance.name;
          });
        }
      });
    });
  }

}
