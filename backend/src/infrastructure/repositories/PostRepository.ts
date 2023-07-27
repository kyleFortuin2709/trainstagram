import Post from "../models/post";
import { IRepository } from "./IRepository";
import {Op} from "sequelize";

export class PostRepository implements IRepository<Post, number> {

    public PostRepository() {}

    async create(body: Post): Promise<Post> {
        return await Post.create({
            postID: 0,
            UserID: body.UserID,
            Image: body.Image,
            Likes: 0,
            Caption: body.Caption,
            PostedAt: body.PostedAt,
        });
    }
    
    async readByID(id: number): Promise<Post | null> {
        console.log(id);
        return await Post?.findByPk(id);
    }

    async readAll(id: number): Promise<Post[] | null> {
        return await Post.findAll({
            where: {
                UserID: {
                    [Op.ne]: id,
                }
            }
        });;
        
    }

    async readAllUser(id: number): Promise<Post[] | null> {
        return await Post.findAll({
            where: {
                UserID: id
            }
        });;
    }
    
    async update(id: number, body: Post): Promise<Post | null> {
        await Post.update({
            Caption: body.Caption,
            Likes: body.Likes,
            PostedAt: body.PostedAt,
        }, { where: { postID: id } });

        const post = await Post.findByPk(id);

        return post;
    }

    async delete(id: number): Promise<boolean> {
        let post = await Post.findByPk(id);
        post?.destroy();
        return true;
    }

}