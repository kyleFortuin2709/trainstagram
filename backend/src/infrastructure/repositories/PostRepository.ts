import { Post } from "../../domain/Post.js";
import db from "../models/index.js";
import { IRepository } from "./IRepository.js";
import {Op} from "sequelize";

export class PostRepository implements IRepository<Post, number> {
    private Post = db.posts

    async create(body: Post): Promise<Post> {
        return await this.Post.create({
            UserId: body.UserId,
            Image: body.Image,
            Likes: 0,
            Caption: body.Caption,
            PostedAt: body.PostedAt,
        });
    }
    
    async readByID(id: number): Promise<Post> {
        console.log(id);
        this.Post
        return await this.Post.findByPk(id);
    }

    async readAll(id: number): Promise<Post[]> {
        return await this.Post.findAll({
            where: {
                UserId: {
                    [Op.ne]: id,
                }
            }
        });;
        
    }

    async readAllUser(id: number): Promise<Post[]> {
        return await this.Post.findAll({
            where: {
                UserId: id
            }
        });;
    }
    
    async update(id: number, body: Post): Promise<Post> {
        let post = await this.Post.findByPk(id);

        post = await this.Post.update({
            Caption: body.Caption,
            Likes: body.Likes,
            PostedAt: body.PostedAt,
        });

        return post;
    }

    async delete(id: number): Promise<boolean> {
        let post = await this.Post.findByPk(id);
        post.destroy();
        return true;
    }



}