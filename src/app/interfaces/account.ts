export interface Account {
    readonly index: number;
    accessToken: string;
    refreshToken: string;
    authenticationFlow: string;
}
