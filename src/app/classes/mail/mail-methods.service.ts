import { Injectable } from '@angular/core';
import { Mail } from './Mail';
import { CharactersService } from '../../services/characters/characters.service';

@Injectable({
  providedIn: 'root'
})
export class MailMethodsService {

  constructor(
    public charactersService: CharactersService
  ) { }

  private append_Mailinfo( mail: Mail ){

  }
  private append_sender( mail:Mail ){
    mail.sender = this.charactersService.get_character( mail.senderIndex );
  }
  private append_recipient( mail: Mail ){

  }
}
