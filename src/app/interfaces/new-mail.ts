import { Recipient } from './recipient';

export interface NewMail{
    // index: number;
    recipients: Recipient[];
    subject: string;
    body: string;
}
