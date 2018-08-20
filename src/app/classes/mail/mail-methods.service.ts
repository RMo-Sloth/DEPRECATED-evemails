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

  public append_Mailinfo( mail: Mail ){

  }
  public append_sender( mail:Mail ){
    mail.sender = this.charactersService.get_character( mail.senderIndex );
  }
  private append_recipient( mail: Mail ){

  }
}
