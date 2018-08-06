export class Mail {
      body: string;
      from: number;
      is_read: boolean;
      labels: number[];
      mail_id: number;
      recipients: {
        recipient_id: number;
        recipient_type: string;
      }[];
      subject: string;
      timestamp: string;
}
