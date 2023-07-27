import User, { UserAttributes } from "../../domain/user";
import { IRepository } from "./IRepository";

export class UserRepository implements IRepository<UserAttributes, number> {

    public UserRepository() {}

    async create(body: UserAttributes): Promise<UserAttributes> {
        return await User.create({
            userID: 0,
            username: body.username,
            biography: body.biography,
            profilePicture: body.profilePicture,
        });
    }
    
    async readByID(id: number): Promise<UserAttributes | undefined> {
        // console.log('DB: ', db);
        console.log('DB users: ', await User.findAll());
        const result = await User.findByPk(id);
        console.log('result: ', result);
        return result?.dataValues;
    }
    async update(id: number, body: UserAttributes): Promise<UserAttributes | null> {
        await User.update({
            username: body.username,
            biography: body.biography,
            profilePicture: body.profilePicture
        }, { where: { userID: id } });

        const user = User.findByPk(id);

        return user;
    }

    async delete(id: number): Promise<boolean> {
        let user = await User.findByPk(id);
        user?.destroy();
        return true;
    }

}