export type Post = {
    PostId?: number;
    UserId: number,
    Image?: Buffer | string,
    Caption: string,
    Likes: number,
    PostedAt: Date,
}