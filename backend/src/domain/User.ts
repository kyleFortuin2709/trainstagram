export type User = {
    userID?: number;
    username: string;
    password: string;
    biography: string;
    profilePicture?: Buffer | string,
}