export interface NewMail{
    readonly index: number;
    readonly recipients: number[];
    readonly subject: string;
    readonly body: string;
}
