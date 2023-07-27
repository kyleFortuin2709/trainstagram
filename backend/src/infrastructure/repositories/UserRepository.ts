import { User } from "../../domain/User";
import db from "../models/index";
import { IRepository } from "./IRepository";

export class UserRepository implements IRepository<User, number> {
    private User = db.users

    async create(body: User): Promise<User> {
        return await this.User.create({
            // userID: number;
            username: body.username,
            biography: body.biography,
            profilePicture: body.profilePicture,
        });
    }
    
    async readByID(id: number): Promise<User> {
        console.log('DB: ', db);
        console.log('DB users: ', db.users);
        return await this.User.findByPk(id);
    }
    async update(id: number, body: User): Promise<User> {
        let user = await this.User.findByPk(id);

        user = await this.User.update({
            username: body.username,
            biography: body.biography,
            profilePicture: body.profilePicture
        });

        return user;
    }

    async delete(id: number): Promise<boolean> {
        let user = await this.User.findByPk(id);
        user.destroy();
        return true;
    }

}