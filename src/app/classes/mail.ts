import { Entity } from './entities';

export class Mail {
    body: string;
    from: number;
    is_read: boolean;
    labels: number[];
    mail_id: number;
    recipients;// TODO:  need to implement a more strict array of entities (persons and corps)
    subject: string;
    timestamp: string;

    constructor(
      body: string,
      from: number,
      is_read: boolean,
      labels: number[],
      mail_id: number,
      recipients, // TODO: need to implement a more strict array of entities (persons and corps)
      subject: string,
      timestamp: string
    ){
      this.body = body;
      this.from = from;
      this.is_read = is_read;
      this.labels = labels;
      this.mail_id = mail_id;
      this.recipients = recipients;
      this.subject = subject;
      this.timestamp = timestamp;
    }
}
