import User, { UserAttributes, UserLoginAttributes } from "../models/user";
import { IRepository } from "./IRepository";

export class UserRepository implements IRepository<UserAttributes, UserLoginAttributes,number> {

    public UserRepository() {}

    async create(body: UserAttributes): Promise<UserAttributes> {
        return await User.create({
            userID: body.userID,
            username: body.username,
            password: body.password,
            biography: body.biography,
            profilePicture: body.profilePicture,
        });
    }

    async readByOne(body: UserLoginAttributes): Promise<UserLoginAttributes | undefined> {
        const user = await User.findOne({
            where:{
                'username' : body.username,
                'password' : body.password
            }
        })

        return user?.dataValues;
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