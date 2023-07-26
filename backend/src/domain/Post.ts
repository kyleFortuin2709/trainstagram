export type Post = {
    PostId?: number;
    UserId: number,
    Image?: Buffer,
    Caption: string,
    Likes: number,
    PostedAt: Date,
}