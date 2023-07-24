import db from "../models";
import { IRepository } from "./IRepository";

export class UserRepository implements IRepository<User, number> {
    private User = db.User

    async create(body: User): Promise<User> {
        return await this.User.create({
            // userID: number;
            username: body.username,
            biography: body.biography,
            profilePicture: body.profilePicture,
        });
    }
    
    async readByID(id: number): Promise<User> {
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