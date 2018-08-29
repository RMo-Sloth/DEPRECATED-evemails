import { Character } from '../character/Character';

export class Mail {
    public index: number;
    body: string = null;
    senderIndex: number;
    sender: Character = null;
    is_read: boolean = false;
    labels: number[] = [];
    recipients;// TODO:  need to implement a more strict array of entities (persons and corps)
    subject: string = 'no topic';
    timestamp: Date = new Date(0);

    constructor(
      mailIndex: number
    ){
      this.index = mailIndex;
    }
}
