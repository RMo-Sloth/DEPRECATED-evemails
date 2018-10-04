export interface Mail{
  readonly index: number;
  readonly account: number;
  readonly labels: number[];
  readonly sender: number;
  readonly recipients: number[];
  readonly subject: string;
  body?: string;
  readonly timestamp: Date;
  isRead: boolean;
}
