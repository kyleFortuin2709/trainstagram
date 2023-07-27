import { DataTypes, Model } from "sequelize";
import Post from "../models/post";
import sequelize from "sequelize/types/sequelize";
import { SequelizeConnection } from "../database/SequelizeConnection";

export interface UserAttributes {
  userID: number;
  username: string;
  biography: string;
  profilePicture: string;
}

  class User extends Model<UserAttributes> implements UserAttributes {
    declare userID: number;
    declare username: string;
    declare biography: string;
    declare profilePicture: string;

  }

  User.init({
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    }
    }, {
      freezeTableName: true,
      modelName: 'User',
      sequelize: SequelizeConnection.getInstance(),
      timestamps: false
    });

    // console.log(User === sequelize.models.User);

    User.hasMany(Post, { foreignKey: 'userID' });
    export default User;