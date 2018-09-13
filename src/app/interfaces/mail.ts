export interface Mail{
  readonly index: number;
  readonly labels: number[];
  readonly sender: number;
  readonly recipients: number[];
  readonly subject: string;
  readonly body?: string;
  readonly tiimestamp: Date;
  readonly isRead: boolean;
}

// TODO: How to deal with undefined body?
// * load the body to all mails seems overkill( but easier )
// * retreive body with a get_body() function, that checks if the property exists. If not make the request. Where should the function be? Private function triggered by a get_mail() function?
